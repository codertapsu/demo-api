import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  public ping() {
    return 'pong';
  }
}
