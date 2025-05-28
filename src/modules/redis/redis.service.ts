// // src/redis/redis.service.ts
// import { Injectable } from '@nestjs/common';
// import { Redis } from '@upstash/redis';

// @Injectable()
// export class RedisService {
//   private client = new Redis({
//     url: process.env.UPSTASH_REDIS_REST_URL!,
//     token: process.env.UPSTASH_REDIS_REST_TOKEN!,
//   });

//   async saveMessage(userId: string, message: string) {
//     await this.client.rpush(`messages:${userId}`, message);
//   }

//   async increment(key: string): Promise<number> {
//     return this.client.incr(key);
//   }

//   async expire(key: string, seconds: number): Promise<void> {
//     await this.client.expire(key, seconds);
//   }
// }


// src/redis/redis.service.ts
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


  // async saveMessage(userId: string, message: string) {
  //   await this.client.rpush(`messages:${userId}`, message);
  // }

  async increment(key: string): Promise<number> {
    return this.client.incr(key);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    if (expireSeconds) {
      await this.client.set(key, value);
    } else {
      await this.client.set(key, value);
    }
  }

  // async rpush(key: string, value: string): Promise<void> {
  //   await this.client.rpush(key, value);
  // }

  async expire(key: string, seconds: number): Promise<void> {
    await this.client.expire(key, seconds);
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(key);
  }
}
