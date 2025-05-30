import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { RedisModule } from 'src/modules/redis/redis.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), RedisModule, AuthModule],

  controllers: [ChatbotController],
  providers: [ChatbotService]
})
export class ChatbotModule { }
