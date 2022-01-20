import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { RedisCacheModule } from 'src/redis';
import { SonicModule, SonicService } from 'src/sonic';
import { AnimesService } from './animes.service';
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
  providers: [AnimesService, SonicService],
})
export class AnimesModule {}
