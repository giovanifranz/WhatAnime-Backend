import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AnimesModule } from './animes/animes.module'
import { LoggerModule } from 'nestjs-pino'
import { loggerConfig } from './config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(loggerConfig),
    MongooseModule.forRoot(process.env.MONGO_DSN, {
      useNewUrlParser: true
    }),
    AnimesModule
  ]
})
export class AppModule {}
