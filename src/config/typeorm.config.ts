// import { registerAs } from '@nestjs/config';
// import { DataSource, DataSourceOptions } from 'typeorm';
// import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './env';

// const config: DataSourceOptions = {
//   type: 'postgres',
//   host: DB_HOST,
//   port: DB_PORT,
//   username: DB_USER,
//   password: DB_PASSWORD,
//   database: DB_NAME,
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   migrations: ['dist/migrations/*{.ts,.js}'],
//   synchronize: true,
//   dropSchema: false,
//   ssl:
//     process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
// };

// export default registerAs('typeorm', () => config);
// export const connectionSource = new DataSource(config);

import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './env';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Emotion } from 'src/modules/emotions/entities/emotion.entity';
import { HelpPoint } from 'src/modules/helppoints/entities/helppoint.entity';
import { Resource } from 'src/modules/resources/entities/resource.entity';
import { Subscription } from 'src/modules/subscription/entities/subscription.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UserState } from 'src/modules/user-state/entities/user-state.entity';

const isProd = process.env.NODE_ENV === 'developer';

const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // host: DB_HOST,
  // port: DB_PORT,
  // username: DB_USER,
  // password: DB_PASSWORD,
  // database: DB_NAME,
  entities: [Contact, Emotion, HelpPoint, Resource, Subscription, User, UserState],
  migrations: [],
  subscribers: [],
  synchronize: false,
  dropSchema: false,
  logging: !isProd,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
