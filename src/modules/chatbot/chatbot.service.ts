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
    const previousContext = await this.redisService.get(contextKey);

    const fullMessage = previousContext
      ? `${previousContext}\nUsuario: ${message}`
      : message;

    console.log(`Contexto anterior: ${previousContext}`);
    console.log(`Mensaje completo enviado: ${fullMessage}`);

    const systemPrompt = `
Eres un asistente emocional para una aplicación web de bienestar que lleva un registro de emociones 
en una bitacora y ofrece recursos multimedia acordes al analisis diario, semanal y mensual.

Sigue estas reglas:
1. Responde entre 2 y 3 oraciones breves
2. Usa emojis relevantes
3. Detecta si el mensaje expresa bienestar o malestar
4. Para bienestar: celebra logros y refuerza lo positivo
5. Para malestar: valida emociones y ofrece apoyo práctico
6. Mantén un tono cálido como mensaje de WhatsApp
7. Evita consejos médicos
8. Sugerir actividades simples y cotidianas
9. Fomenta la autoexpresión y el autocuidado
10. No uses lenguaje técnico o explicaciones largas

Ejemplos de respuestas:
- "¡Qué bueno que te sientes así! 😊 ¿Qué actividad te gustaría hacer para mantener esta energía?"
- "Lamento que estés pasando por esto 🫂. ¿Quieres compartir más para buscar juntos una solución?"

Ahora responde a esto: "${message}"
`;

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(systemPrompt); // <-- Usar el systemPrompt
    let response = result.response.text();


    response = this.postProcessResponse(response);

    if (isUnsafeResponse(response)) {
      return "No puedo responder a eso por seguridad.";
    }

    await this.redisService.set(contextKey, fullMessage, 3600); // Expira en 1 hora

    return response;
  }

  private postProcessResponse(response: string): string {
    // Eliminar texto técnico o explicaciones largas
    return response.split('\n')[0].substring(0, 160); // Limitar a 160 caracteres
  }
}
