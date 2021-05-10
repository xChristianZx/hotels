import express from 'express';

import { currentUser } from './currentUser';
import { loginRouter } from './login';
import { logoutRouter } from './logout';
import { registerRouter } from './register';

const router = express.Router();

router.use(currentUser);
router.use(loginRouter);
router.use(logoutRouter);
router.use(registerRouter);

export { router as authRouter };
