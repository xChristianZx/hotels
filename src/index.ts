import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/mongodb';
dotenv.config();

import mikroConfig from './mikro-orm.config';
import { User } from './entities';

import { hotelsRouter } from './routes/hotels/index';
import { authRouter } from './routes/auth/index';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
};

const PORT = process.env.PORT || 4000;
const app = express();

(async () => {
  DI.orm = await MikroORM.init(mikroConfig);
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);

  app.use(cors());
  app.use(express.json());

  app.use((req, res, next) => {
    RequestContext.create(DI.orm.em, next);
  });

  app.use('/hotels', hotelsRouter);
  app.use('/auth', authRouter);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
