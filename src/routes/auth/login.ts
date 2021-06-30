import express, { Request, Response } from 'express';
import { Password } from '../../utils/password';
import { body, validationResult } from 'express-validator';
import { validationFormatter } from '../../utils/validationFormatter';
import { JWT } from '../../utils/jwt';

import { DI } from '../../index';
import { User } from '../../entities';

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('A valid email address is required'),
    body('password')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Password is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req).formatWith(validationFormatter);

      if (!errors.isEmpty()) {
        console.error('Credentials validation error', errors.mapped());
        throw new Error('Invalid email or password');
      }

      const { email, password } = req.body;

      const user = await DI.em.findOne(User, { email });
      if (!user) {
        throw new Error('User does not exist');
      }

      const isValidPassword = await Password.compare(user.password, password);

      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

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

      // console.log('JWT', userJwt);
      res.status(200).json({
        message: `${user?.fullName} logged in`,
        token: userJwt,
        user: userInfo,
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
);

export { router as loginRouter };
