import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/exception.filter';
import { EnvironmentsService } from './common/services/environments/environments.service';
import { getEnvNumber, getEnvString } from './common/utils/env.functions';
import { AppConfig } from './configs/app.config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

/**
 * Bootstrap function to initialize and configure the NestJS application
 */
async function bootstrap() {
  new EnvironmentsService().check();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Trust Proxy Configuration
  app.set('trust proxy', 1);

  // Global Prefix Configuration
  app.setGlobalPrefix(AppConfig.API_GLOBAL_PREFIX);

  // CORS Configuration
  app.enableCors({
    origin: getEnvString('CORS_ORIGINS')
      .split(',')
      .map((url) => url.trim()),
    methods: 'GET,POST,PATCH,DELETE,HEAD,OPTIONS',
    credentials: true,
    exposedHeaders: ['accessToken', 'refreshToken'],
  });

  // Swagger Documentation
  if (getEnvString('NODE_ENV') === 'development') {
    const config = new DocumentBuilder().setTitle('YChat API').setVersion('0.1.0').build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    const theme = new SwaggerTheme();
    const darkThemeOptions = {
      explorer: true,
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    };

    SwaggerModule.setup('swagger', app, documentFactory, { jsonDocumentUrl: 'swagger/json' });
    SwaggerModule.setup('swagger/dark', app, documentFactory, darkThemeOptions);
  }

  // Global pipes and filters
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  // Start the Application
  await app.listen(getEnvNumber('PORT'));
}

bootstrap();
