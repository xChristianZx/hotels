import express, { Request, Response } from 'express';
import { currentUser } from '../../middleware/currentUser';

const router = express.Router();

router.get('/currentuser', currentUser, (req: Request, res: Response) => {
  res.json({ currentUser: req.currentUser || null });
});

export { router as currentUser };
