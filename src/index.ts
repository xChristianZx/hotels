import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { indexRouter } from './routes/index';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

app.use(indexRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
