import { Module } from '@nestjs/common';
import { sonicProviders } from './sonic.providers';

@Module({
  providers: [...sonicProviders],
  exports: [...sonicProviders],
})
export class SonicModule { }
