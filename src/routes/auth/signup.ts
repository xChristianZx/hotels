import express, { NextFunction, Request, Response } from 'express';
import { Password } from '../../utils/password';
import { body, validationResult } from 'express-validator';
import { JWT } from '../../utils/jwt';
import {
  BadRequestError,
  RequestValidationError,
} from '../../utils/errorHandlers';

import { DI } from '../../index';
import { User } from '../../entities';

const router = express.Router();

router.post(
  '/signup',
  [
    body('firstName')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('First name is required'),
    body('lastName')
      .trim()
      .isString()
      .notEmpty()
      .withMessage('Last name is required'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Must be a valid email address'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 128 })
      .withMessage('Password must be between 6 and 128 characters'),
    body('confirmPassword')
      .trim()
      .notEmpty()
      .withMessage('Confirm password is required'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.error('Sign up credentials validation error', errors.mapped());
        throw new RequestValidationError(errors.array());
      }

      if (password !== confirmPassword) {
        throw new BadRequestError('Passwords do not match');
      }

      const existingUser = await DI.userRepository.findOne({ email });

      if (existingUser) {
        throw new BadRequestError('User already exists');
      }

      const hashedPassword = await Password.toHash(password);

      const user = new User(firstName, lastName, email, hashedPassword);
      await DI.userRepository.persist(user).flush();

      const userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
      };

      const userJwt = await JWT.sign({
        id: user._id,
        email: user.email,
      });

      req.session = { jwt: userJwt };

      res.status(201).json({
        message: `New user ${user.fullName} added`,
        token: userJwt,
        user: userInfo,
      });
    } catch (err) {
      next(err);
    }
  }
);

export { router as signUpRouter };
