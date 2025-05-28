// src/chatbot/chatbot.service.ts
import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RedisService } from 'src/modules/redis/redis.service';
import {
  isCompetitorMentioned,
  isIrrelevantMessage,
  isUnsafeResponse,
} from 'src/modules/chatbot/filters/messageFilters';
import { GEMINI_API_KEY } from 'src/config/env';

@Injectable()
export class ChatbotService {
  private genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  constructor(private readonly redisService: RedisService) {}

  async receiveMessage(userId: string, message: string): Promise<string> {
    if (isIrrelevantMessage(message)) {
      return 'No puedo responder a ese tipo de temas.';
    }

    if (isCompetitorMentioned(message)) {
      return 'No puedo hablar de otras agencias.';
    }
    const contextKey = `chatbot:context:${userId}`;
    const previousContext = await this.redisService.get(contextKey);

    const fullMessage = previousContext
      ? `${previousContext}\nUsuario: ${message}`
      : message;

    console.log(`Contexto anterior: ${previousContext}`);
    console.log(`Mensaje completo enviado: ${fullMessage}`);

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const response = result.response.text();

    if (isUnsafeResponse(response)) {
      return 'No puedo responder a eso por seguridad.';
    }

    await this.redisService.set(contextKey, fullMessage, 3600); // Expira en 1 hora

    return response;
  }
}
