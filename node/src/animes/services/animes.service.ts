import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { map, concatAll } from 'rxjs/operators';
import { Anime } from '../entities/anime.entity';
import { sonicChannelSearch } from 'src/sonic/sonic';
import { ExternalApiService } from './externalApi.service';
import { DatabaseService } from './database.service';

@Injectable()
export class AnimesService {
  constructor(
    private externalService: ExternalApiService,
    private databaseService: DatabaseService,
    @InjectModel('Anime') private readonly animeModel: Model<Anime>,
  ) { }


  async getAnimeByTitle(title: string) {
    const animeResults = await this.getAnimeForSonic(title)
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

  async getAnimeForSonic(param: string) {
    const result = await sonicChannelSearch.query(
      'anime-database',
      'animes',
      param,
      { lang: 'eng' },
    );
    const animeResults: Array<Anime> = [];
    for (let index = 0; index < result.length; index++) {
      animeResults.push(await this.animeModel.findById(result[index]).exec());
    }
    return animeResults;
  }

  async getSuggestForSonic(param: string) {
    const results = await sonicChannelSearch.suggest(
      'anime-database',
      'animes',
      param,
      { limit: 5 },
    );
    const jsonResult = JSON.stringify(Object.assign({}, results));
    return jsonResult;
  }
}
