import { Controller, Post, Body, BadRequestException, UseGuards, Res, HttpException, HttpStatus, Request } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { MessageLimiterGuard } from 'src/modules/chatbot/middlewares/message-limit.middleware';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Chatbot')
@ApiBearerAuth()
@UseGuards(MessageLimiterGuard)
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) { }

  @Post('message')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PREMIUM)
  @ApiOperation({ summary: 'Enviar un mensaje al chatbot (solo ADMIN o PREMIUM)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: '¿Cuál es el clima hoy?' },
      },
      required: ['message'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Respuesta del chatbot generada correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  @ApiResponse({
    status: 429,
    description: 'Límite de mensajes alcanzado (por MessageLimiterGuard).',
  })
  async sendMessage(
    @Request() req,
    @Body('message') message: string
  ) {
    const userId = req.user.id;
    const response = await this.chatbotService.receiveMessage(userId, message);
    return { response }

  }
}
