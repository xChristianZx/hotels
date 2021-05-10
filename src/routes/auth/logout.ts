import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/logout', async (req: Request, res: Response) => {
  req.session = null;

  res.status(200).json({ message: 'You are now logged out' });
});

export { router as logoutRouter };
