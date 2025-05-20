import { Module } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { EmotionsController } from './emotions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emotion } from './entities/emotion.entity';
import { UserState } from '../user-state/entities/user-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion, UserState])],
  controllers: [EmotionsController],
  providers: [EmotionsService],
})
export class EmotionsModule { }