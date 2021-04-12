import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

/**
 * Get a single hotel info
 * */
router.get('/hotels/:id', async (req: Request, res: Response) => {
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
    return res.status(400).json({ message: error.message });
  }
});

export { router as showRouter };
