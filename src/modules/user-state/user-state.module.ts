import { Module } from '@nestjs/common';
import { UserStateService } from './user-state.service';
import { UserStateController } from './user-state.controller';

@Module({
  controllers: [UserStateController],
  providers: [UserStateService],
})
export class UserStateModule {}
