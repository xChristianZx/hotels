import { Configuration, Options } from '@mikro-orm/core';
import { BaseEntity, User, Booking } from './entities';

const options: Options = {
  clientUrl: process.env.MIKRO_ORM_CLIENT_URL,
  dbName: process.env.MIKRO_ORM_DB_NAME,
  debug: true,
  entities: [BaseEntity, User, Booking],
  type: process.env.MIKRO_ORM_TYPE as keyof typeof Configuration.PLATFORMS,
};

export default options;
