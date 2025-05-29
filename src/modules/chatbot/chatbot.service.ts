// import { Injectable, ForbiddenException, Inject } from '@nestjs/common';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { RedisService } from 'src/modules/redis/redis.service';
// import { isCompetitorMentioned, isIrrelevantMessage, isUnsafeResponse } from 'src/modules/chatbot/filters/messageFilters';
// import { GEMINI_API_KEY } from 'src/config/env';

// @Injectable()
// export class ChatbotService {
//   private genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

//   constructor(private readonly redisService: RedisService) { }


//   async receiveMessage(userId: string, message: string): Promise<string> {
//     if (isIrrelevantMessage(message)) {
//       return "No puedo responder a ese tipo de temas.";
//     }

//     if (isCompetitorMentioned(message)) {
//       return "No puedo hablar de otras agencias.";
//     }

//     const contextKey = `chatbot:context:${userId}`;
//     const contextList = await this.redisService.lRange(contextKey, 0, -1);
//     const fullMessage = [...contextList, `Usuario: ${message}`].join('\n');

//     const maxContextLength = 1000;
//     const truncatedContext = fullMessage.slice(-maxContextLength);

//     const systemPrompt = `
// Eres un asistente emocional para una aplicación web de bienestar que lleva un registro de emociones 
// en una bitacora y ofrece recursos multimedia acordes al analisis diario, semanal y mensual.

// Sigue estas reglas:
// 1. Responde entre 2 y 3 oraciones breves
// 2. Usa emojis relevantes
// 3. Detecta si el mensaje expresa bienestar o malestar
// 4. Para bienestar: celebra logros y refuerza lo positivo
// 5. Para malestar: valida emociones y ofrece apoyo práctico
// 6. Mantén un tono cálido, sin muchas preguntas, como mensajes de WhatsApp con un amigo
// 7. Evita consejos médicos
// 8. Sugerir actividades simples y cotidianas
// 9. Fomenta la expresión y el autocuidado
// 10. No uses lenguaje técnico o explicaciones largas

// Ejemplos de respuestas:
// - "¡Qué bueno que te sientes así! 😊 Mucha gente usa actividades que les gusten hacer para mantener esta energía, podríamos probar pensar en alguna"
// - "Lamento que estés pasando por esto 🫂. Quizas compartiendome lo que sentis podemos encontrar juntos una forma de solucionarlo"

// Ahora responde a esto: "${message}"
// `;

//     const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     const result = await model.generateContent(systemPrompt);
//     let response = result.response.text();


//     response = this.postProcessResponse(response);

//     if (isUnsafeResponse(response)) {
//       return "No puedo responder a eso por seguridad.";
//     }

//     await this.redisService.rPush(contextKey, `Usuario: ${message}`);
//     await this.redisService.rPush(contextKey, `Asistente: ${response}`);
//     await this.redisService.lTrim(contextKey, -10, -1);
//     await this.redisService.expire(contextKey, 900);

//     return response;
//   }

//   private postProcessResponse(response: string): string {
//     const maxLength = 220;
//     if (response.length <= maxLength) return response;

//     const lastSentenceEnd = response.lastIndexOf('.', maxLength);
//     if (lastSentenceEnd > 0) {
//       return response.slice(0, lastSentenceEnd + 1);
//     }

//     const lastSpace = response.lastIndexOf(' ', maxLength);
//     return response.slice(0, lastSpace) + '...';
//   }

// }
