import { Controller, Post, Body, BadRequestException, UseGuards, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageLimiterGuard } from 'src/modules/chatbot/middlewares/message-limit.middleware';
import { MessageDto } from './dto/message.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @UseGuards(MessageLimiterGuard)

  @Post()
  async handleWebChatbotMessage(
    @Body('message') message: string,
    @Body('userId') userId?: string
  ) {
    if (!message) {
      throw new BadRequestException('El mensaje es requerido');
    }
    const response = await this.chatbotService.receiveMessage(userId || 'anonimo', message);
    return { response };
  }

  @Post()
  async handleMessage(
    @Body() body: MessageDto,
    @Res() res): Promise<any> {
    const { userId = 'anonimo', message } = body;

    if (!message) {
      throw new HttpException('El mensaje es requerido', HttpStatus.BAD_REQUEST);
    }

    const response = await this.chatbotService.receiveMessage(userId, message);
    return res.json({ response });
  }


  @Post('message')
  async sendMessage(
    @Body('userId') userId: string,
    @Body('message') message: string
  ) {
    const response = await this.chatbotService.receiveMessage(userId, message);
    return { response };
  }


}
