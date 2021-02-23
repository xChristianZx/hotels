import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

/**
 * Get all hotels
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const baseUrl = 'https://sandbox.impala.travel/v1/hotels?size=25&sortBy=rating:desc';
    const response = await axios.get(baseUrl, {
      headers: { 'x-api-key': process.env.HOTEL_SANDBOX_KEY },
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
