import { Module } from '@nestjs/common';

import { CommonModule } from '@app/common';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';

@Module({
  imports: [CommonModule, AuthenticationModule],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
