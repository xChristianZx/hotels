import express from 'express';

import { newBookingRouter } from './new';
import { userBookingsRouter } from './userBookings';
import { showBookingRouter } from './show';
import { updateBookingRouter } from './update';
import { cancelBookingRouter } from './cancelBooking';

const router = express.Router();

router.use(newBookingRouter);
router.use(userBookingsRouter);
router.use(showBookingRouter);
router.use(updateBookingRouter);
router.use(cancelBookingRouter);

export { router as bookingsRouter };
