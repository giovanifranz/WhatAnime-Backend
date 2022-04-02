import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Anime } from 'src/animes/schemas/anime.schema'
import { sonicChannelSearch } from './sonic'

@Injectable()
export class SonicService {
  constructor(
    @InjectModel('Anime') private readonly animeModel: Model<Anime>
  ) {}

  async getAnimeForSonic(param: string) {
    const result = await sonicChannelSearch.query(
      'anime-database',
      'animes',
      param,
      { lang: 'eng' }
    )
    const animeResults: Array<Anime> = []
    for (let index = 0; index < result.length; index++) {
      animeResults.push(await this.animeModel.findById(result[index]).exec())
    }
    return animeResults
  }

  async getSuggestForSonic(param: string) {
    const results = await sonicChannelSearch.suggest(
      'anime-database',
      'animes',
      param,
      { limit: 5 }
    )
    const suggestResults = JSON.stringify(Object.assign({}, results))
    return suggestResults
  }
}
