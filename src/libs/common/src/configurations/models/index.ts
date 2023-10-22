export type { AppConfig } from './app-config.model';
export type { JwtConfig } from './jwt-config.model';
export type { SwaggerConfig } from './swagger-config.model';

export enum Config {
  App = 'APP',
  Jwt = 'JWT',
  Swagger = 'SWAGGER',
}
