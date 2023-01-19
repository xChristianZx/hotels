import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { DI } from '../..';
import { BadRequestError } from '../../utils/errorHandlers';
import { requireLogin } from '../../middleware/requireLogin';

const router = express.Router();

const BASE_URL = 'https://sandbox.impala.travel/v1/bookings';

// Pass bookingId that matches Booking.bookingId
router.get(
  '/:bookingId',
  requireLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId } = req.params;
      const { currentUser } = req;

      // Verify currentUser is booking owner
      const booking = await DI.bookingRepository.findOneOrFail({
        bookingId,
        guestName: currentUser!.id,
      });
      
      console.log('booking', booking);
      
      // Send request to Impala API
      const response = await axios.get(`${BASE_URL}/${booking.bookingId}`, {
        headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
      });

      if (response.status === 200) {
        res.json({
          message: `Booking #${bookingId} successfully retrieved`,
          data: response.data,
        });
      }
    } catch (error) {
      console.error(error);
      next(new BadRequestError(error.message));
    }
  }
);

export { router as showBookingRouter };
