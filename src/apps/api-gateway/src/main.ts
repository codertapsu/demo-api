import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';

import { AppConfig, Config, SwaggerConfig } from '@app/common/configurations';

import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  // Load configurations
  const appConfig = configService.get<AppConfig>(Config.App);
  const swaggerConfig = configService.get<SwaggerConfig>(Config.Swagger);

  if (swaggerConfig.enable) {
    (await import('./services/swagger')).setup(app, appConfig);
  }
  app.startAllMicroservices();

  await app.listen(appConfig.port, appConfig.host);

  return app.getUrl();
}

bootstrap()
  .then((url) => {
    console.log(`Application is running on: ${url}`);
  })
  .catch((error) => {
    console.log(error);
  });
