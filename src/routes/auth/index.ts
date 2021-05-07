import express from 'express';

import { loginRouter } from './login';
import { registerRouter } from './register';

const router = express.Router();

router.use(loginRouter);
router.use(registerRouter);

export { router as authRouter };
