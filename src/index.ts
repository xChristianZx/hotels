import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
import cookieSession from 'cookie-session';
dotenv.config();

import mikroConfig from './mikro-orm.config';
import { User, Booking } from './entities';

import { hotelsRouter } from './routes/hotels/index';
import { authRouter } from './routes/auth/index';
import { bookingsRouter } from './routes/bookings/index';

import { errorHandler } from './middleware/errorHandler';
import { NotFoundError } from './utils/errorHandlers';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  bookingRepository: EntityRepository<Booking>;
};

const PORT = process.env.PORT || 4000;
const app = express();

(async () => {
  DI.orm = await MikroORM.init(mikroConfig);
  DI.em = DI.orm.em;

  DI.userRepository = DI.orm.em.getRepository(User);
  DI.bookingRepository = DI.orm.em.getRepository(Booking);

  const corsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: [`${process.env.CLIENT_PROD_DOMAIN}`, 'http://localhost:3000'],
    preflightContinue: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(helmet());
  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  app.use(
    cookieSession({
      name: '_sid',
      signed: false,
      secure: process.env.NODE_ENV === 'production',
    })
  );

  app.use((req, res, next) => {
    RequestContext.create(DI.orm.em, next);
  });

  app.use('/hotels', hotelsRouter);
  app.use('/auth', authRouter);
  app.use('/bookings', bookingsRouter);

  app.use('*', (req, res) => {
    throw new NotFoundError();
  });
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
