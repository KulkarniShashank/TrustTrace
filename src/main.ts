import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle(`Trust Trace`)
    .setDescription(`Trust Trace APIs`)
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:3005`)
    .addServer(`https://trusttrace-api.credebl.id`)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3005);
}
bootstrap();
