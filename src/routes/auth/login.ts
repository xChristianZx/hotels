import express, { Request, Response } from 'express';
import { Password } from '../../utils/password';
import { body, validationResult } from 'express-validator';
import { validationFormatter } from '../../utils/validationFormatter';

import { DI } from '../../index';
import { User } from '../../entities';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('A valid email address is required'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).formatWith(validationFormatter);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const results = await DI.em.findOne(User, { email });
      if (!results) {
        throw new Error('User does not exist');
      }

      const isValidPassword = await Password.compare(
        results.password,
        password
      );

      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      console.log('results', results);
      res.json(`${results?.fullName} logged in`);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
);

export { router as loginRouter };
