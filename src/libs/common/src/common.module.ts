import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonService } from './common.service';
import { registerConfig } from './configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: registerConfig(),
    }),
  ],
  providers: [CommonService],
  exports: [ConfigModule, CommonService],
})
export class CommonModule {}
