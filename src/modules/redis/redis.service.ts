import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';


@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      socket: {
        host: 'redis-15979.c336.samerica-east1-1.gce.redns.redis-cloud.com',
        port: 15979,
      },
      username: 'default',
      password: 'S4KMEM1Du6KoFKFFg4IkSgsYNsT58SF8',
    });

    this.client.on('error', (err) => console.error('Redis error:', err));
    await this.client.connect();
  }

  async saveMessage(userId: string, message: string) {
    await this.client.rPush(`messages:${userId}`, message);
  }

  async increment(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    if (expireSeconds) {
      await this.client.set(key, value, { EX: expireSeconds });
    } else {
      await this.client.set(key, value);
    }
  }

  async expire(key: string, seconds: number): Promise<void> {
    await this.client.expire(key, seconds);
  }
}
