import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Anime } from './schemas/anime.schema'
import { sonicChannelIngest, SonicService } from 'src/sonic'
import { RedisCacheService } from 'src/redis'
import { CreateAnimeDto } from './dto/create-anime.dto'
import { concatAll, map, mergeMap, tap, toArray } from 'rxjs/operators'
import { AnimesClient } from './client/animes.client'
import type { Quote, Top } from './interfaces/animes'

@Injectable()
export class AnimesService {
  constructor(
    @InjectModel('Anime') private readonly animeModel: Model<Anime>,
    private readonly redisCacheService: RedisCacheService,
    private readonly sonicService: SonicService,
    private readonly animesClient: AnimesClient
  ) {}

  private async createInDatabases(anime: CreateAnimeDto): Promise<Anime> {
    const createdAnime = new this.animeModel(anime)
    const animeSaved = await createdAnime.save()

    if (!animeSaved) {
      throw new InternalServerErrorException('Problema para salvar anime')
    }

    await sonicChannelIngest.push(
      'anime-database',
      'animes',
      `${createdAnime._id}`,
      `${createdAnime.title}`,
      {
        lang: 'eng'
      }
    )
    return animeSaved
  }

  async getAnimeByTitle(title: string) {
    const cached = await this.redisCacheService.get(title)
    if (cached) {
      return cached as Array<Anime>
    }
    const animeResults = await this.sonicService.getAnimeForSonic(title)
    if (animeResults.length < 1) {
      return this.animesClient.getAnimeByTitleOnJikan(title).pipe(
        mergeMap((response) => {
          return response.slice(0, 5).map((anime) => {
            return this.animesClient.getAnimeByIdOnJikan(anime.mal_id).pipe(
              map(async (anime) => {
                const newAnime = await this.createInDatabases(anime)
                this.redisCacheService.set(title, newAnime, 60 * 60 * 24)
                return newAnime
              }),
              concatAll()
            )
          })
        }),
        concatAll(),
        toArray()
      )
    } else {
      await this.redisCacheService.set(title, animeResults, 60 * 60 * 24)
      return animeResults
    }
  }

  async getAnimeRandom() {
    const cached = await this.redisCacheService.get('random')
    if (cached) {
      return cached as Anime
    }

    const randomAnime = this.animesClient.getRandomId().pipe(
      map((id) => this.animesClient.getAnimeByIdOnJikan(id)),
      concatAll(),
      map((anime) => this.createInDatabases(anime)),
      concatAll(),
      tap((anime) => this.redisCacheService.set('random', anime, 36))
    )

    return randomAnime
  }

  async getTopAiring() {
    const cached = await this.redisCacheService.get('airing')
    if (cached) {
      return cached as Array<Top>
    }
    return this.animesClient.getTopAiring()
  }

  async getTopPopular() {
    const cached = await this.redisCacheService.get('popular')
    if (cached) {
      return cached as Array<Top>
    }
    return this.animesClient.getTopPopular()
  }

  async getQuote() {
    const cached = await this.redisCacheService.get('quote')
    if (cached) {
      return cached as Quote
    }

    return this.animesClient.getQuote()
  }
}
