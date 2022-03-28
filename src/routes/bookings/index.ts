import express from 'express';

import { newBookingRouter } from './new';
import { userBookingsRouter } from './userBookings';
import { cancelBookingRouter } from './cancelBooking';

const router = express.Router();

router.use(newBookingRouter);
router.use(userBookingsRouter);
router.use(cancelBookingRouter);

export { router as bookingsRouter };
