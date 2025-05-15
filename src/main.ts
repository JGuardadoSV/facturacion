import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Configuración de seguridad
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Configuración de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración de interceptores y filtros
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Facturación')
    .setDescription('API para el sistema de facturación electrónica')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticación')
    .addTag('empresa', 'Gestión de empresas')
    .addTag('dte', 'Documentos Tributarios Electrónicos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Configuración del puerto
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Aplicación iniciada en el puerto ${port}`);
}

bootstrap();
