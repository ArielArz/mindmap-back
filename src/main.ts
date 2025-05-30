import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerDI } from './middlewares/loggerDI.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Sentia Backend API')
    .setDescription('Proyecto Final de Full Stack Developer, Bootcamp soyHenry')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users', 'emotions')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT ?? 3000;

  // Middleware personalizado
  app.use(loggerDI);

  // Habilitar CORS
  app.enableCors();

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.use('/stripe/webhook', express.raw({ type: 'application/json' }));

  // Escuchar en 0.0.0.0 para que sea accesible desde la red
  await app.listen(PORT, '0.0.0.0');

  // Monitoreo de uso de memoria
  setInterval(() => {
    const mem = process.memoryUsage();
    console.log(`--- RAM USAGE @ ${new Date().toISOString()} ---`);
    console.log(`rss: ${(mem.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`heapTotal: ${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`heapUsed: ${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`external: ${(mem.external / 1024 / 1024).toFixed(2)} MB`);
    console.log(`arrayBuffers: ${(mem.arrayBuffers / 1024 / 1024).toFixed(2)} MB`);
    console.log('--- RAM USAGE ---');
  }, 10000);

  console.log(`Server running on port ${PORT}`);
}

bootstrap().catch((error) => {
  console.error('Fatal error in bootstrap:', error);
});
