import express, { NextFunction, Request, Response } from 'express';
import { DI } from '../..';
import { BadRequestError } from '../../utils/errorHandlers';
import { requireLogin } from '../../middleware/requireLogin';

const router = express.Router();

/**
 * Get all bookings for a user
 * */
router.get(
  '/',
  requireLogin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentUser } = req;
      // Fetch bookings from user accounts
      const user = await DI.userRepository.findOneOrFail(currentUser!.id, {
        populate: ['bookings'],
      });

      res.json({
        message: `Bookings for ${user.fullName}`,
        data: user.bookings,
      });
    } catch (error) {
      // console.error(error);
      next(new BadRequestError(error.message));
    }
  }
);

export { router as userBookings };
