import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { Config, JwtConfig } from '@app/common/configurations';

import { UserRole } from '../../../constants';
import { AuthenticationEntity } from '../entities/authentication.entity';

@Injectable()
export class AuthenticationService {
  private readonly _jwtConfig: JwtConfig;

  public constructor(
    private _configService: ConfigService,
    private _jwtService: JwtService,
  ) {
    this._jwtConfig = _configService.get<JwtConfig>(Config.Jwt);
  }

  public async getAuthenticatedUser(username: string): Promise<Partial<AuthenticationEntity>> {
    try {
      //  FIXME: Mock user temporary
      if (username === 'admin') {
        return { username, roles: [UserRole.Admin] };
      }
      if (username === 'normal') {
        return { username, roles: [UserRole.Normal] };
      }
      if (username === 'limited') {
        return { username, roles: [UserRole.Limited] };
      }
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public async getAuthenticatedUserByUsername(username: string): Promise<Partial<AuthenticationEntity>> {
    try {
      //  FIXME: Mock user temporary
      if (username === 'admin') {
        return { username, roles: [UserRole.Admin] };
      }
      if (username === 'normal') {
        return { username, roles: [UserRole.Normal] };
      }
      if (username === 'limited') {
        return { username, roles: [UserRole.Limited] };
      }
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtAccessToken(username: string) {
    const payload = { username };
    const token = this._jwtService.sign(payload, {
      secret: this._jwtConfig.accessSecret,
      expiresIn: `${this._jwtConfig.accessExpiresIn}s`,
    });
    return `${this._jwtConfig.accessKey}=${token}; HttpOnly; Path=/; Max-Age=${this._jwtConfig.accessExpiresIn}; SameSite=None; Secure`;
  }
}
