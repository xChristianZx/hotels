import express, { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';
import { queryCheck } from '../../utils/queryCheck';
import { BadRequestError } from '../../utils/errorHandlers';

const BASE_URL = 'https://sandbox.impala.travel/v1/hotels';

const router = express.Router();

/**
 * Get all hotels
 * Note: Nested object params need to be sent to Impala API in
 * bracket notation
 * Ex. starRating: {gte: 4} ==> starRating[gte]=4
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const convertedQuery = await queryCheck(req.query);

    const response = await axios.get(BASE_URL, {
      headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
      params: {
        ...convertedQuery,
        starRating: { gte: 4 },
        size: 10,
        sortBy: 'rating:desc',
      },
      paramsSerializer: {
        serialize: params => {
          return qs.stringify(params, { encode: false });
        },
      },
    });
    // console.log('response', response);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    next(new BadRequestError(error.message));
  }
});

export { router as getAllRouter };
