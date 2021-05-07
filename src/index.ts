import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import mikroConfig from './mikro-orm.config';
import { EntityManager, MikroORM, RequestContext } from '@mikro-orm/core';
import { indexRouter } from './routes/index';
import { showRouter } from './routes/show';
import { authRouter } from './routes/auth';

import { User } from './entities';
import { EntityRepository } from '@mikro-orm/mongodb';

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

  app.use(indexRouter);
  app.use(showRouter);
  app.use(authRouter);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
