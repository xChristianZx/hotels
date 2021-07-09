import express, { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { BadRequestError } from '../../utils/errorHandlers';

const router = express.Router();

/**
 * Get a single hotel info
 * */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { query } = req;

  try {
    const baseUrl = `https://sandbox.impala.travel/v1/hotels/${id}`;
    const response = await axios.get(baseUrl, {
      headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
      params: { start: query.start, end: query.end },
    });
    res.json(response.data);
  } catch (error) {
    // console.error(error);
    next(new BadRequestError(error.message));
  }
});

export { router as showRouter };
