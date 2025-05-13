import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EmotionsModule } from './modules/emotions/emotions.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { UsersModule } from './modules/users/users.module';
import { LocationModule } from './modules/location/location.module';
import { UserStateModule } from './modules/user-state/user-state.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeormConfig,
    }),
    AuthModule,
    EmotionsModule,
    ResourcesModule,
    UsersModule,
    LocationModule,
    UserStateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
