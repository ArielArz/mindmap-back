import { Module } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { EmotionsController } from './emotions.controller';

@Module({
  controllers: [EmotionsController],
  providers: [EmotionsService],
})
export class EmotionsModule {}
