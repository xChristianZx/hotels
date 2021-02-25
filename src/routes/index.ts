import express, { Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';

const router = express.Router();

/**
 * Get all hotels
 * Note: Nested object params need to be sent to Impala API in 
 * bracket notation
 * Ex. starRating: {gte: 4} ==> starRating[gte]=4
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const baseUrl = 'https://sandbox.impala.travel/v1/hotels';
    const response = await axios.get(baseUrl, {
      headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
      params: { size: 10, sortBy: { rating: 'desc' }, ...req.query },
      paramsSerializer: params => {        
        return qs.stringify(params, { encode: false });
      },
    });
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

/**
 * Get a single hotel info
 * */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const baseUrl = `https://sandbox.impala.travel/v1/hotels/${id}`;
    const response = await axios.get(baseUrl, {
      headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

export { router as indexRouter };
