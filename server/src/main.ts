import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  app.enableCors({
    origin: 'http://192.168.0.106:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  })
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.getOrThrow<number>('PORT'));
}
void bootstrap();
