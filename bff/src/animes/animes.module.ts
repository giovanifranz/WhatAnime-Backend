import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AnimesService } from './animes.service';
import { AnimesController } from './animes.controller';
import { SonicModule } from 'src/sonic/sonic.module';
import { AnimeSchema } from './schemas/anime.schema';
@Module({
  imports: [
    HttpModule,
    SonicModule,
    MongooseModule.forFeature([{ name: 'Anime', schema: AnimeSchema }]),
  ],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimesModule {}
