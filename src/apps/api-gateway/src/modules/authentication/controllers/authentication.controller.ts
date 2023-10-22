import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';

import { LogInDto } from '../../../dto';
import { JwtAuthenticationGuard, LocalAuthenticationGuard } from '../../../guards';
import { AuthenticationEntity } from '../entities/authentication.entity';
import { AuthenticationService } from '../services/authentication.service';

@ApiTags('authentication')
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  public constructor(private readonly _authenticationService: AuthenticationService) {}

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiBody({ type: LogInDto })
  public async logIn(@Req() request: Request, @Res({ passthrough: true }) __: Response): Promise<unknown> {
    const { user } = request as unknown as { user: AuthenticationEntity };
    const accessTokenCookie = this._authenticationService.getCookieWithJwtAccessToken(user.username);
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    return user;
  }

  @Get('me')
  @UseGuards(JwtAuthenticationGuard)
  public getCurrentAuthUser(@Req() request: Request): unknown {
    const { user } = request as unknown as { user: AuthenticationEntity };

    return user;
  }
}
