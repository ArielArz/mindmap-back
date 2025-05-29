import { Controller, Post, Body, BadRequestException, UseGuards, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageLimiterGuard } from 'src/modules/chatbot/middlewares/message-limit.middleware';
import { MessageDto } from './dto/message.dto';
@UseGuards(MessageLimiterGuard)

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @Post('message')
  async sendMessage(
    @Body('userId') userId: string,
    @Body('message') message: string
  ) {
    const response = await this.chatbotService.receiveMessage(userId, message);
    return { response };
  }

}
