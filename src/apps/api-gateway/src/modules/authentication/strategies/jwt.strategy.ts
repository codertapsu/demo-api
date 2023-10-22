import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Config, JwtConfig } from '@app/common/configurations';

import { AuthStrategy } from '../../../constants';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.Jwt) {
  public constructor(
    private _configService: ConfigService,
    private _authenticationService: AuthenticationService,
  ) {
    const jwtConfig = _configService.get<JwtConfig>(Config.Jwt);

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies[jwtConfig.accessKey];
        },
      ]),
      secretOrKey: jwtConfig.accessSecret,
    });
  }

  public async validate(payload: { username: string }): Promise<Partial<AuthenticationEntity>> {
    return this._authenticationService.getAuthenticatedUserByUsername(payload.username);
  }
}
