import { Controller, Post, Body, BadRequestException, UseGuards, Res, HttpException, HttpStatus, Request } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageLimiterGuard } from 'src/modules/chatbot/middlewares/message-limit.middleware';
import { AuthenticationGuard } from 'src/guard/auth.guard';


@UseGuards(AuthenticationGuard, MessageLimiterGuard)
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @Post('message')
  async sendMessage(
    @Request() req,
    @Body('message') message: string
  ) {
    const userId = req.user.id; // JWT decodificado
    const response = await this.chatbotService.receiveMessage(userId, message);
    return { response }

  }
}
