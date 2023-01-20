import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import * as yup from 'yup';
import {
  BadRequestError,
  RequestValidationError,
} from '../../utils/errorHandlers';

import { currentUser } from '../../middleware/currentUser';

import { DI } from '../..';
import { Booking } from '../../entities';

const BASE_URL = 'https://sandbox.impala.travel/v1/bookings';

const router = express.Router();

/* {
        "start": "2021-12-24",
        "end": "2021-12-28",
        "bookingContact": {
          "firstName": "Jocelín",
          "lastName": "Carreón Sample",
          "email": "jocelin.carreon.crespo@example.com"
        },
        "rooms": [
          {
            "rateId": "i8fIZ277SPDq4UohuxAft5Sr29UhMvyc0VypRxLiRFLoTk0XHmEbgSQ",
            "adults": 2
          }
        ]
      } */

const newBookingSchema = yup.object({
  body: yup.object({
    start: yup.date().required('Start date is required'),
    end: yup.date().required('End date is required'),
    bookingContact: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      email: yup.string().email().required('Email is required'),
    }),
    rooms: yup.array().of(
      yup.object({
        rateId: yup.string().required(),
        adults: yup
          .number()
          .min(1, 'At least one guest is required')
          .required(),
      })
    ),
  }),
});

const validate =
  (schema: yup.BaseSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
      });
      return next();
    } catch (error) {
      console.log('/booking/new validation error', error);
      next(new RequestValidationError(error.errors));
    }
  };

router.post(
  '/new',
  validate(newBookingSchema),
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, currentUser } = req;
      // Impala Booking API
      const response = await axios.post(BASE_URL, body, {
        headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
      });

      const { bookingId, status, start, end, hotel } = response.data;

      // Check for registered user
      const user = await DI.userRepository.findOne(
        {
          id: currentUser!.id,
        },
        { populate: ['bookings'] }
      );

      if (!user) {
        throw new Error('User account does not exist. Please sign up.');
      }

      // Create booking on internal db
      const booking = new Booking(
        bookingId,
        status,
        hotel.hotelId,
        hotel.name,
        start,
        end,
        user
      );

      await DI.bookingRepository.persistAndFlush(booking);

      res.json({ message: `Booking Successful`, data: response.data });
    } catch (error) {
      console.error('booking/new ERROR', error.response);
      next(new BadRequestError(error.response.data.message));
    }
  }
);

export { router as newBookingRouter };
