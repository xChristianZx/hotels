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
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
  ],
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult(req).formatWith(validationFormatter);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existingUser = await DI.userRepository.findOne({ email });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await Password.toHash(password);

      const user = new User(firstName, lastName, email, hashedPassword);
      await DI.userRepository.persist(user).flush();

      const userJwt = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };

      res.status(201).json(`New user ${user.fullName} added`);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
);

export { router as registerRouter };
