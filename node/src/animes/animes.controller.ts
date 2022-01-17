import { Controller, Get, Param, Query } from '@nestjs/common';
import { DatabaseService, ExternalApiService } from './services';
import { SonicService } from 'src/sonic';
import { RedisCacheService } from 'src/redis';
import { Anime, Top } from './entities/anime.entity';
import { concatAll, map, mergeMap, tap, toArray } from 'rxjs/operators';

@Controller()
export class AnimesController {
  constructor(
    private redisCacheService: RedisCacheService,
    private externalService: ExternalApiService,
    private databaseService: DatabaseService,
    private sonicService: SonicService,
    private externalApiService: ExternalApiService
  ) {}

  @Get('/title/:title')
  async getAnimeByTitle(@Param('title') title: string) {
    const cached = await this.redisCacheService.get(title);
    if (cached) {
      return cached as Array<Anime>;
    }
    const animeResults = await this.sonicService.getAnimeForSonic(title);
    if (animeResults.length < 1) {
      return this.externalService.getAnimeByTitleOnJikan(title).pipe(
        mergeMap((response) => {
          return response.slice(0, 5).map((anime) => {
            return this.externalService.getAnimeByIdOnJikan(anime.mal_id).pipe(
              map(async (anime) => {
                const newAnime = await this.databaseService.createInDatabases(
                  anime,
                );
                this.redisCacheService.set(title, newAnime, 60 * 60 * 24);
                return newAnime;
              }),
              concatAll(),
            );
          });
        }),
        concatAll(),
        toArray(),
      );
    } else {
      await this.redisCacheService.set(title, animeResults, 60 * 60 * 24);
      return animeResults;
    }
  }

  @Get('/random')
  async getRandomAnime() {
    const cached = await this.redisCacheService.get('random');
    if (cached) {
      return cached as Anime;
    }

    const randomAnime = this.externalService.getRandomId().pipe(
      map((id) => this.externalService.getAnimeByIdOnJikan(id)),
      concatAll(),
      map((anime) => this.databaseService.createInDatabases(anime)),
      concatAll(),
      tap((anime) => this.redisCacheService.set('random', anime, 36)),
    );

    return randomAnime;
  }

  @Get('/quote')
  async getQuote() {
    return this.externalApiService.getQuote();
  }

  @Get('/sonic')
  async getAnimeForSonic(@Query('param') reqParam: string) {
    return await this.sonicService.getAnimeForSonic(reqParam);
  }

  @Get('/suggest')
  async getSuggestForSonic(@Query('param') reqParam: string) {
    return await this.sonicService.getSuggestForSonic(reqParam);
  }

  @Get('/airing')
  async getTopAiring() {
    const cached = await this.redisCacheService.get('airing');
    if (cached) {
      return cached as Array<Top>;
    }
    return this.externalApiService.getTopAiring();
  }

  @Get('/popular')
  async getTopPopular() {
    const cached = await this.redisCacheService.get('popular');
    if (cached) {
      return cached as Array<Top>;
    }
    return this.externalApiService.getTopPopular();
  }
}
