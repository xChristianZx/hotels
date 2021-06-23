import express, { Request, Response } from 'express';
import { Password } from '../../utils/password';
import { body, validationResult } from 'express-validator';
import { validationFormatter } from '../../utils/validationFormatter';
import jwt from 'jsonwebtoken';

import { DI } from '../../index';
import { User } from '../../entities';

const router = express.Router();

router.post(
  '/register',
  [
    body('firstName').trim().notEmpty(),
    body('lastName').trim().notEmpty(),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Must be a valid email address'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 128 })
      .withMessage('Password must be between 6 and 128 characters'),
  ],
  async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const errors = validationResult(req).formatWith(validationFormatter);

      if (!errors.isEmpty()) {
        console.error(
          'Registration credentials validation error',
          errors.mapped()
        );
        throw new Error(errors.mapped().toString());
      }

      const existingUser = await DI.userRepository.findOne({ email });

      if (existingUser) {
        throw new Error('User already exists');
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

      const userJwt = jwt.sign(
        {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
        },
        process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };

      res.status(201).json({
        message: `New user ${user.fullName} added`,
        token: userJwt,
        user: userInfo,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
);

export { router as registerRouter };
