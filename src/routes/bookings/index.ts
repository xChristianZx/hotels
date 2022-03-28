import express from 'express';

import { newBookingRouter } from './new';
import { userBookings } from './userBookings';
import { cancelBookingRouter } from './cancelBooking';

const router = express.Router();

router.use(newBookingRouter);
router.use(userBookings);
router.use(cancelBookingRouter);

export { router as bookingsRouter };
