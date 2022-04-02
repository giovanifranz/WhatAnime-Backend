import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HttpModule } from '@nestjs/axios'
import { RedisCacheModule } from 'src/redis'
import { SonicModule, SonicService } from 'src/sonic'
import { AnimesClient } from './client/animes.client'
import { AnimesService } from './animes.service'
import { AnimesController } from './animes.controller'
import { AnimeSchema } from './schemas/anime.schema'

@Module({
  imports: [
    HttpModule,
    SonicModule,
    RedisCacheModule,
    MongooseModule.forFeature([{ name: 'Anime', schema: AnimeSchema }])
  ],
  controllers: [AnimesController],
  providers: [AnimesClient, AnimesService, SonicService]
})
export class AnimesModule {}
