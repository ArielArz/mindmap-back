import { Module } from '@nestjs/common';
import { UserStateService } from './user-state.service';
import { UserStateController } from './user-state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserState } from './entities/user-state.entity';
import { Emotion } from '../emotions/entities/emotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([UserState]), TypeOrmModule.forFeature([Emotion])],
  controllers: [UserStateController],
  providers: [UserStateService],
})
export class UserStateModule { }
