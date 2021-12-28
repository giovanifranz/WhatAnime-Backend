import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AnimesService } from './services/animes.service';
import { DatabaseService, ExternalApiService, SonicService } from './services'
import { AnimesController } from './animes.controller';
import { SonicModule } from 'src/sonic/sonic.module';
import { AnimeSchema } from './entities/anime.entity';
import { RedisCacheModule } from 'src/redis/redis.module';

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
