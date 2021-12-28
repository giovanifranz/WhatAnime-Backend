import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { RedisCacheModule } from 'src/redis';
import { SonicModule, SonicService } from 'src/sonic';
import { AnimesService } from './services/animes.service';
import { DatabaseService, ExternalApiService } from './services'
import { AnimesController } from './animes.controller';
import { AnimeSchema } from './entities/anime.entity';

@Module({
  imports: [
    HttpModule,
    SonicModule,
    RedisCacheModule,
    MongooseModule.forFeature([{ name: 'Anime', schema: AnimeSchema }]),
  ],
  controllers: [AnimesController],
  providers: [AnimesService, DatabaseService, ExternalApiService, SonicService],
})
export class AnimesModule { }
