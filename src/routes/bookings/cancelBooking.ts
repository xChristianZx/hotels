import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { DI } from '../..';
import { BadRequestError } from '../../utils/errorHandlers';
import { requireLogin } from '../../middleware/requireLogin';
import { BookingStatus } from '../../entities/Booking';

const router = express.Router();

const BASE_URL = 'https://sandbox.impala.travel/v1/bookings';

// Pass bookingId that matches Booking.bookingId
router.delete(
  '/cancel/:bookingId',
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

      // Send cancellation request to Impala API
      const response = await axios.delete(`${BASE_URL}/${booking.bookingId}`, {
        headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
      });

      if (response.status === 200) {
        // Update booking status in local DB
        booking.status = BookingStatus.CANCELLED;
        await DI.bookingRepository.flush();

        res.json({
          message: `Booking #${bookingId} successfully cancelled`,
          data: response.data,
        });
      }
    } catch (error) {
      console.error(error);
      next(new BadRequestError(error.message));
    }
  }
);

export { router as cancelBookingRouter };
