import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RedisService } from 'src/modules/redis/redis.service';
import { isCompetitorMentioned, isIrrelevantMessage, isUnsafeResponse } from 'src/modules/chatbot/filters/messageFilters';
import { GEMINI_API_KEY } from 'src/config/env';

@Injectable()
export class ChatbotService {
  private genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  constructor(private readonly redisService: RedisService) { }


  async receiveMessage(userId: string, message: string): Promise<string> {
    if (isIrrelevantMessage(message)) {
      return "No puedo responder a ese tipo de temas.";
    }

    if (isCompetitorMentioned(message)) {
      return "No puedo hablar de otras agencias.";
    }

    const contextKey = `chatbot:context:${userId}`;
    const contextList = await this.redisService.lRange(contextKey, 0, -1);
    const parsedList = contextList.map(item => JSON.parse(item));

    const historyAsText = parsedList.map(entry => entry.text);
    historyAsText.push(message);

    const fullMessage = historyAsText.join('\n');


    const systemPrompt = `
Eres un asistente emocional que responde de forma breve pero completa. 
Usa emojis relevantes. Detecta emociones, da consejos si te lo piden.
Evita saludar en cada mensaje. Sé claro y cálido.
Segui el flujo de la conversacion. Fomenta la expresión y el autocuidado.
"${fullMessage}"
`;

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(systemPrompt);
    let response = result.response.text();

    function removeInitialGreeting(text: string): string {
      return text.replace(/^(Hola[!¡]?|Hola! 😊|¡Hola! 😊)[\s,]*/i, '').trim();
    }
    response = this.postProcessResponse(response);
    response = removeInitialGreeting(response);


    if (isUnsafeResponse(response)) {
      return "No puedo responder a eso por seguridad.";
    }
    await this.redisService.rPush(contextKey, JSON.stringify({ role: 'user', text: message }));
    await this.redisService.rPush(contextKey, JSON.stringify({ role: 'assistant', text: response }));


    await this.redisService.lTrim(contextKey, -60, -1);
    await this.redisService.expire(contextKey, 1800);

    return response;
  }

  private postProcessResponse(response: string): string {
    const maxLength = 400;
    if (response.length <= maxLength) return response;

    const lastSentenceEnd = response.lastIndexOf('.', maxLength);
    if (lastSentenceEnd > 0) {
      return response.slice(0, lastSentenceEnd + 1);
    }

    const lastSpace = response.lastIndexOf(' ', maxLength);
    return response.slice(0, lastSpace) + '...';
  }

}
