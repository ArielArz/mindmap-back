import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { loggerDI } from './middlewares/loggerDI.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  // Escuchar en 0.0.0.0 para que sea accesible desde la red
  await app.listen(PORT, '0.0.0.0');

  console.log(`Server running on port ${PORT}`);
}

bootstrap().catch((error) => {
  console.error('Fatal error in bootstrap:', error);
});
