import { Request, Response, NextFunction } from 'express';
import { JWT } from '../utils/jwt';
import { NotAuthorizedError } from '../utils/errorHandlers/notAuthorizedError';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    next(new NotAuthorizedError());
  }

  try {
    const payload = (await JWT.verify(req.session?.jwt)) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    console.error(err);
    next();
  }
  next();
};
