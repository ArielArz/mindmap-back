import { Controller, Post, Body, BadRequestException, UseGuards, Res, HttpException, HttpStatus, Request } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageLimiterGuard } from 'src/modules/chatbot/middlewares/message-limit.middleware';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/enum/user-role.enum';


@UseGuards(MessageLimiterGuard)
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @Post('message')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PREMIUM)
  async sendMessage(
    @Request() req,
    @Body('message') message: string
  ) {
    const userId = req.user.id;
    const response = await this.chatbotService.receiveMessage(userId, message);
    return { response }

  }
}
