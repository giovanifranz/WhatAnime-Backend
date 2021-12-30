import { Injectable } from '@nestjs/common';
import { tap, map, toArray, concatAll, mergeMap } from 'rxjs/operators';
import { ExternalApiService, DatabaseService } from './';
import { SonicService } from 'src/sonic';
import { RedisCacheService } from 'src/redis';
import { Anime } from 'src/animes/entities/anime.entity';

@Injectable()
export class AnimesService {
  constructor(
    private redisCacheService: RedisCacheService,
    private externalService: ExternalApiService,
    private databaseService: DatabaseService,
    private sonicService: SonicService,
  ) {}

  async getAnimeByTitle(title: string) {
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
}
