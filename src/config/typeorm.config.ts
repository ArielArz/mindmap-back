import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Emotion } from '../entities/emotion.entity';
import { UserState } from '../entities/user-state.entity';
import { Resource } from '../entities/resource.entity';
import { Location } from '../entities/location.entity';

export const typeOrmConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Emotion, UserState, Resource, Location],
  synchronize: true,
  logging: true,
  retryDelay: 3000,
});
