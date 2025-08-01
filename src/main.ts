import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const options = new DocumentBuilder()
    .setTitle('GeoTNB API')
    .setDescription('API documentation for GeoTNB backend')
    .setVersion('1.0')
    .addBearerAuth()  // Si tu utilises JWT pour l'authentification
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);  // L'API sera accessible sur /api

  await app.listen(3000);
}
bootstrap();
