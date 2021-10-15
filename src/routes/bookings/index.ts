import express from 'express';

import { newBookingRouter } from './new';

const router = express.Router();

router.use(newBookingRouter);

export { router as bookingsRouter };
