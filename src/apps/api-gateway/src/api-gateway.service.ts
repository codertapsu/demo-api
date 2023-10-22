import { Injectable } from '@nestjs/common';

import { CommonService } from '@app/common';

@Injectable()
export class ApiGatewayService {
  public constructor(private readonly _commonService: CommonService) {}

  public getHello(): string {
    return 'Hello World!';
  }

  public ping(): string {
    return this._commonService.ping();
  }
}
