import { Injectable } from '@nestjs/common';
import { tap, map, concatAll } from 'rxjs/operators';
import { ExternalApiService, DatabaseService, SonicService } from './';
import { RedisCacheService } from 'src/redis/redis.service';

@Injectable()
export class AnimesService {
  constructor(
    private redisCacheService: RedisCacheService,
    private externalService: ExternalApiService,
    private databaseService: DatabaseService,
    private sonicService: SonicService,
  ) { }

  async getAnimeByTitle(title: string) {
    const cached = await this.redisCacheService.get(title);
    if (cached) {
      return cached
    }
    const animeResults = await this.sonicService.getAnimeForSonic(title)
    if (animeResults.length < 1) {
      const anime = this.externalService.getAnimeByTitleOnJikan(title).pipe(
        map(response => response[0].mal_id),
        map(id => this.externalService.getAnimeByIdOnJikan(id)),
        concatAll(),
        map(anime => this.databaseService.createInDatabases(anime)),
        concatAll(),
        tap(anime => this.redisCacheService.set(title, anime, 60 * 60 * 24))
      )
      return anime
    } else {
      const anime = animeResults[0]
      await this.redisCacheService.set(title, anime, 60 * 60 * 24)
      return anime
    }
  }

  async getRandomAnime() {
    const cached = await this.redisCacheService.get('random');
    if (cached) {
      return cached
    }

    const randomAnime = this.externalService.getRandomId().pipe(
      map(id => this.externalService.getAnimeByIdOnJikan(id)),
      concatAll(),
      map(anime => this.databaseService.createInDatabases(anime)),
      concatAll(),
      tap(anime => this.redisCacheService.set('random', anime, 36))
    )

    return randomAnime
  }
}
