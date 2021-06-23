import express from 'express';

import { currentUser } from './currentUser';
import { loginRouter } from './login';
import { logoutRouter } from './logout';
import { signUpRouter } from './signup';

const router = express.Router();

router.use(currentUser);
router.use(loginRouter);
router.use(logoutRouter);
router.use(signUpRouter);

export { router as authRouter };
