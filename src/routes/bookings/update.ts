
import express, { Request, Response, NextFunction, response } from 'express';
import axios from 'axios';
import * as yup from 'yup';
import { DI } from '../..';
import { requireLogin } from '../../middleware/requireLogin';
import {
BadRequestError,
RequestValidationError,
} from '../../utils/errorHandlers';

const router = express.Router();

const BASE_URL = 'https://sandbox.impala.travel/v1/bookings';

// {
// "start": "2022-06-01",
// "end": "2022-06-05",
// "bookingContact": {
// "firstName": "Doug",
// "lastName": "Danger",
// "email": "doug.danger@example.com"
// },
// "rooms": [
// {
// "rateId": "ab9f48947623d2f2f71233d06476f8f2:db22cc8b380aaea3ccf2fec13147366e869a1c4f43ba5ff7deacb282a24fc1de260020b6914bc04d2d19ca49c0aa3f35b199d1761c9668453235d9571442263a",
// "adults": 2
// }
// ],
// "updateBookingVersionAtTimestamp": "2022-03-30T05:53:33.479Z"
// }

const updateBookingSchema = yup.object({
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
updateBookingVersionAtTimestamp: yup
.date()
.required(
'updateBookingVersionAtTimestamp (updatedAt) field is required'
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
console.log(
'/booking/:bookingId/update req.body validation error',
error
);
next(new RequestValidationError(error.errors));
}
};

router.put(
'/:bookingId/update',
validate(updateBookingSchema),
requireLogin,
async (req: Request, res: Response, next: NextFunction) => {
try {
const { bookingId } = req.params;
const { currentUser, body } = req;

      // Verify currentUser is booking owner
      const booking = await DI.bookingRepository.findOneOrFail({
        bookingId,
        guestName: currentUser!.id,
      });

      //  Fetch updatedAt property required by Impala API
      //  to avoid race conditions
      const updatedAtFetch = await axios.get(
        `${BASE_URL}/${booking.bookingId}`,
        {
          headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
        }
      );

      // Add updatedAtFetch to put request body
      const reqBody = {
        ...body,
        updateBookingVersionAtTimestamp: updatedAtFetch,
      };

      // Send update request to Impala API
      const response = await axios.put(
        `${BASE_URL}/${booking.bookingId}`,
        reqBody,
        {
          headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
        }
      );
      if (response.status === 200) {
        //  Update local db
        DI.bookingRepository.assign(booking, reqBody);
        await DI.bookingRepository.flush();
      }

      res.json({
        message: `Booking #${bookingId} updated`,
        data: response.data,
      });
    } catch (error) {
      console.error(error);
      next(new BadRequestError(error));
    }

}
);

export { router as updateBookingRouter };
