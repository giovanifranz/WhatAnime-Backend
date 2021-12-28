import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AnimesController } from './animes.controller';
import { SonicModule } from 'src/sonic/sonic.module';
import { AnimeSchema } from './entities/anime.entity';
import { AnimesService, DatabaseService, ExternalApiService, SonicService } from './services'

@Module({
  imports: [
    HttpModule,
    SonicModule,
    MongooseModule.forFeature([{ name: 'Anime', schema: AnimeSchema }]),
  ],
  controllers: [AnimesController],
  providers: [AnimesService, DatabaseService, ExternalApiService, SonicService],
})
export class AnimesModule { }
