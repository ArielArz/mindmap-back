import { forwardRef, Module } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { EmotionsController } from './emotions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emotion } from './entities/emotion.entity';
import { UserState } from '../user-state/entities/user-state.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion, UserState]),
  forwardRef(() => UsersModule),
  ],

  controllers: [EmotionsController],
  providers: [EmotionsService],
  exports: [TypeOrmModule]

})
export class EmotionsModule { }