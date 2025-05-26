import { Module } from '@nestjs/common';
import { UserStateService } from './user-state.service';
import { UserStateController } from './user-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserState } from './entities/user-state.entity';
import { Emotion } from '../emotions/entities/emotion.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserState, Emotion]),
    AuthModule],

  controllers: [UserStateController],
  providers: [UserStateService],
  exports: [UserStateService],

})
export class UserStateModule { }
