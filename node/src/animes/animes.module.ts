import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { AnimesService } from './services/animes.service';
import { AnimesController } from './animes.controller';
import { SonicModule } from 'src/sonic/sonic.module';
import { AnimeSchema } from './entities/anime.entity';
import { DatabaseService } from './services/database.service';
import { ExternalApiService } from './services/externalApi.service';
import { SonicService } from './services/sonic.service';

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
