import { Controller, Get } from '@nestjs/common';

import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  public constructor(private readonly _apiGatewayService: ApiGatewayService) {}

  @Get()
  public getHello(): string {
    return this._apiGatewayService.getHello();
  }

  @Get()
  public ping(): string {
    return this._apiGatewayService.ping();
  }
}
