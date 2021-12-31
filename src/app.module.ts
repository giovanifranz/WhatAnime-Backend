import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimesModule } from './animes/animes.module';
import { RedisCacheModule } from './redis';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisCacheModule,
    MongooseModule.forRoot(process.env.MONGO_DSN, {
      useNewUrlParser: true,
    }),
    AnimesModule,
  ],
})
export class AppModule {}
