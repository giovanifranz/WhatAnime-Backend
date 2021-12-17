import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimesModule } from './animes/animes.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/whatanime'),
    AnimesModule,
  ],
})
export class AppModule {}
