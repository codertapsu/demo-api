import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from '@app/common';

import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { registerConfig } from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: registerConfig(),
    }),
    CommonModule,
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
