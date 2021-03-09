import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import { indexRouter } from './routes/index';
import { showRouter } from './routes/show';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRouter);
app.use(showRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
