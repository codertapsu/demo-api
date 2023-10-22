import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { AuthStrategy } from '../../../constants';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AuthStrategy.Local) {
  public constructor(private _authenticationService: AuthenticationService) {
    super();
  }

  public async validate(username: string, password: string): Promise<Partial<AuthenticationEntity>> {
    const authenticatedUser = await this._authenticationService.getAuthenticatedUser(username, password);
    if (authenticatedUser) {
      return authenticatedUser;
    }
    throw new UnauthorizedException();
  }
}
