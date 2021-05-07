import express from 'express';

import { getAllRouter } from './getAll';
import { showRouter } from './show';

const router = express.Router();

router.use(getAllRouter);
router.use(showRouter);

export { router as hotelsRouter };
