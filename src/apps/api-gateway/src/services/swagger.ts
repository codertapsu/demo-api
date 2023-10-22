import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import fs from 'fs';

import { AppConfig } from '@app/common/configurations';

import { AuthStrategy } from '../constants';

const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    withCredentials: true,
    // requestInterceptor: (req) => {
    //   req.credentials = 'include';
    //   return req;
    // },
  },
};

const writeSwaggerJson = (path: string, document: OpenAPIObject) => {
  fs.writeFileSync(`${path}/swagger.json`, JSON.stringify(document, null, 2), { encoding: 'utf8' });
};

export function setup(app: INestApplication, appConfig: AppConfig): void {
  const config = new DocumentBuilder()
    .setTitle('NestJS Demo')
    .setContact('Khanh Hoang', 'https://github.com/codertapsu', 'hoangduykhanh21@gmail.com')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: AuthStrategy.Jwt }, AuthStrategy.Jwt);
  const document = SwaggerModule.createDocument(app, config.build());
  writeSwaggerJson(`${process.cwd()}`, document);
  SwaggerModule.setup(appConfig.basePath, app, document, customOptions);
}
