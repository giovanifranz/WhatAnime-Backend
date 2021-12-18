import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Anime, Quote, AnimeByTitle } from './entities/anime.entity';
import { sonicChannelIngest, sonicChannelSearch } from 'src/sonic/sonic';
import { CreateAnimeDto } from './dto/create-anime.dto';

const jikanAPI = 'https://api.jikan.moe/v3';
const animeChan = 'https://animechan.vercel.app/api/random';

@Injectable()
export class AnimesService {
  constructor(
    private httpService: HttpService,
    @InjectModel('Anime') private readonly animeModel: Model<Anime>,
  ) {}

  findByTitle(title: string): Observable<Array<AnimeByTitle>> {
    const data: Observable<Array<AnimeByTitle>> = this.httpService
      .get(`${jikanAPI}/search/anime?q=${title}`)
      .pipe(
        map((response) => {
          return response.data.results.map((anime: AnimeByTitle) => {
            const year = new Date(anime.start_date).getFullYear();
            return {
              ...anime,
              year,
            };
          });
        }),
      );

    return data;
  }

  findById(id: number): Observable<Anime> {
    const data = this.httpService.get(`${jikanAPI}/anime/${id}`).pipe(
      map((response: AxiosResponse<Anime>) => {
        const result = response.data;
        const year = new Date(result.aired.from).getFullYear();
        const synopsis = result.synopsis.replace(
          '[Written by MAL Rewrite]',
          '',
        );
        const anime = { ...result, year, synopsis };
        return anime;
      }),
    );
    return data;
  }

  findQuote(): Observable<Quote> {
    const data = this.httpService.get(animeChan).pipe(
      map((response: AxiosResponse<Quote>) => {
        return response.data;
      }),
    );
    return data;
  }

  findRandomId(): Observable<number> {
    const date = Math.floor(+new Date() / 1000);
    const myRandomFunctionAnime = date.toString().slice(4, 13).split('');
    const newArray = myRandomFunctionAnime
      .slice(1, 6)
      .map((x) => parseInt(x, 10));
    const sum = newArray.reduce(function (sum, i) {
      return sum + i;
    });
    const id = this.httpService
      .get(`${jikanAPI}/top/anime/${myRandomFunctionAnime[0]}/tv`)
      .pipe(
        map((response) => {
          return parseInt(response.data.top[sum].mal_id.toString(), 10);
        }),
      );
    return id;
  }

  async create(anime: CreateAnimeDto): Promise<Anime> {
    const createdAnime = new this.animeModel(anime);
    const animeSaved = await createdAnime.save();

    if (!animeSaved) {
      throw new InternalServerErrorException('Problema para salvar anime');
    }

    await sonicChannelIngest.push(
      'anime-database',
      'animes',
      `${createdAnime._id}`,
      `${createdAnime.title} ${createdAnime.synopsis}`,
      {
        lang: 'eng',
      },
    );

    return animeSaved;
  }

  async getAnimeForSonic(param: string) {
    const result = await sonicChannelSearch.query(
      'anime-database',
      'animes',
      param,
      { lang: 'eng' },
    );
    const jsonResult = [];

    for (let index = 0; index < result.length; index++) {
      jsonResult.push(await this.animeModel.findById(result[index]).exec());
    }
    return jsonResult;
  }
}
