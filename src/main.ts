import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('cmsapimqsg/v1');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '100mb' }));
  await app.listen(configService.get('port'));
}
bootstrap();
