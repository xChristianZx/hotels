import express from 'express';

import { newBookingRouter } from './new';
import { userBookings } from './userBookings';

const router = express.Router();

router.use(newBookingRouter);
router.use(userBookings);

export { router as bookingsRouter };
