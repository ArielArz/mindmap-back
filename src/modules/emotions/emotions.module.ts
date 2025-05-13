import { Module } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { EmotionsController } from './emotions.controller';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [EmotionsController],
  providers: [EmotionsService],
})
export class EmotionsModule {}
