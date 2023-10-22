import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppConfig, Config } from '@configuration';

import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  // Load configurations
  const appConfig = configService.get<AppConfig>(Config.App);

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
