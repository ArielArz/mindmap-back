import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './env';

const config: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: true,
  dropSchema: false,
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);

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

const isProd = process.env.NODE_ENV === 'developer';

const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [],
  subscribers: [],
  synchronize: true,
  dropSchema: false,
  logging: !isProd,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config);
