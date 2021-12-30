import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { RedisCacheService } from 'src/redis';
import {
  Anime,
  Quote,
  AnimeByTitle,
  Ranking,
  Top,
} from '../entities/anime.entity';

const jikanAPI = 'https://api.jikan.moe/v3';
const animeChan = 'https://animechan.vercel.app/api/random';

@Injectable()
export class ExternalApiService {
  constructor(
    private redisCacheService: RedisCacheService,
    private httpService: HttpService,
  ) {}

  getAnimeByTitleOnJikan(title: string): Observable<Array<AnimeByTitle>> {
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

  getAnimeByIdOnJikan(id: number) {
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

  getRandomId() {
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
        map((response) =>
          parseInt(response.data.top[sum].mal_id.toString(), 10),
        ),
      );
    return id;
  }

  getQuote() {
    const data = this.httpService
      .get(animeChan)
      .pipe(map((response: AxiosResponse<Quote>) => response.data));
    return data;
  }

  async getTopAiring() {
    const cached = await this.redisCacheService.get('airing');
    if (cached) {
      return cached as Array<Top>;
    }

    const data = this.httpService.get(`${jikanAPI}/top/anime/1/airing`).pipe(
      map((response: AxiosResponse<Ranking>) => response.data.top.slice(0, 5)),
      tap((ranking) =>
        this.redisCacheService.set('airing', ranking, 60 * 60 * 24),
      ),
    );
    return data;
  }

  async getTopPopular() {
    const cached = await this.redisCacheService.get('popular');
    if (cached) {
      return cached as Array<Top>;
    }

    const data = this.httpService
      .get(`${jikanAPI}/top/anime/1/bypopularity`)
      .pipe(
        map((response: AxiosResponse<Ranking>) =>
          response.data.top.slice(0, 5),
        ),
        tap((ranking) =>
          this.redisCacheService.set('popular', ranking, 60 * 60 * 24),
        ),
      );
    return data;
  }
}
