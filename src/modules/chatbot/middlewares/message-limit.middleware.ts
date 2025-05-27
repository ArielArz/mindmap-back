// src/common/guards/message-limit.guard.ts
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RedisService } from 'src/modules/redis/redis.service';

@Injectable()
export class MessageLimiterGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.body.userId || 'anonimo';
    const key = `ratelimit:${userId}`;

    const currentCount = await this.redisService.increment(key);
    if (currentCount === 1) {
      await this.redisService.expire(key, 60); // 1 minuto
    }

    if (currentCount > 5) {
      throw new HttpException('Has enviado demasiados mensajes. Intenta de nuevo más tarde.',
        HttpStatus.TOO_MANY_REQUESTS,);
    }

    return true;
  }
}
