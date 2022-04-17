import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { DatabaseModule } from './database/database.module'
import { AnimesModule } from './http/http.module'
import { SonicModule } from './sonic/sonic.module'
import { loggerConfig } from './config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(loggerConfig),
    DatabaseModule,
    AnimesModule,
    SonicModule,
  ],
})
export class AppModule {}
