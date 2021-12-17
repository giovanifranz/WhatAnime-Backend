import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AnimeByTitle, AnimeById, Quote } from '../entities/anime.entity';

const jikanAPI = 'https://api.jikan.moe/v3';
const traceMoeAPI = 'https://api.trace.moe/search?url=';
const animeChan = 'https://animechan.vercel.app/api/random';

@Injectable()
export class AnimesService {
  constructor(private httpService: HttpService) {}

  async findByTitle(title: string): Promise<Observable<Array<AnimeByTitle>>> {
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

  async findById(id: number): Promise<Observable<AnimeById>> {
    const data = this.httpService.get(`${jikanAPI}/anime/${id}`).pipe(
      map((response: AxiosResponse<AnimeById>) => {
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

  async findQuote(): Promise<Observable<Promise<Quote>>> {
    const data = this.httpService.get(animeChan).pipe(
      map(async (response: AxiosResponse<Quote>) => {
        return response.data;
      }),
    );
    return data;
  }

  async findRandomId() {
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
        map(async (response) => {
          return parseInt(response.data.top[sum].mal_id.toString(), 10);
        }),
      );
    return id;
  }
}
