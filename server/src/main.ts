import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Trello API')
    .setDescription('This is an API for Trello clone app')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Column')
    .addTag('Card')
    .addTag('Comment')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        in: 'header',
      },
      'Token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: '*',
    credentials: false,
    allowedHeaders: '*',
  });
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
