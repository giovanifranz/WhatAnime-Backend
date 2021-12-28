import { Injectable } from '@nestjs/common';
import { map, concatAll } from 'rxjs/operators';
import { ExternalApiService, DatabaseService, SonicService } from '.';

@Injectable()
export class AnimesService {
  constructor(
    private externalService: ExternalApiService,
    private databaseService: DatabaseService,
    private sonicService: SonicService,
  ) { }


  async getAnimeByTitle(title: string) {
    const animeResults = await this.sonicService.getAnimeForSonic(title)
    if (animeResults.length < 1) {
      const anime = this.externalService.getAnimeByTitleOnJikan(title).pipe(
        map(response => response[0].mal_id),
        map(id => this.externalService.getAnimeByIdOnJikan(id)),
        concatAll(),
        map(anime => this.databaseService.createInDatabases(anime)),
        concatAll()
      )
      return anime
    } else {
      const anime = animeResults[0]
      return anime
    }
  }

  getRandomAnime() {
    const randomAnime = this.externalService.getRandomId().pipe(
      map(id => this.externalService.getAnimeByIdOnJikan(id)),
      concatAll(),
      map(anime => this.databaseService.createInDatabases(anime)),
      concatAll()
    )

    return randomAnime
  }
}
