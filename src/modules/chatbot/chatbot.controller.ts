import { Controller, Post, Body, BadRequestException, UseGuards, Res, HttpException, HttpStatus, Request } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageLimiterGuard } from 'src/modules/chatbot/middlewares/message-limit.middleware';


@UseGuards(MessageLimiterGuard)
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @Post('message')
  async sendMessage(
    @Request() req,
    @Body('message') message: string
  ) {
    const userId = req.user.id;
    const response = await this.chatbotService.receiveMessage(userId, message);
    return { response }

  }
}
