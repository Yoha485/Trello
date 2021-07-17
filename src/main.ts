import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
