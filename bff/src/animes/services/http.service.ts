import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, tap } from 'rxjs/operators';
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
        const animeQuote = await response.data;
        const { anime } = animeQuote;
        const animeData = await this.findByTitle(anime).then((data) => {
          return data[0];
        });
        if (!animeData[0]) {
          return animeQuote;
        }
        const newQuote = { id: animeData[0].mal_id, ...animeQuote };
        return newQuote;
      }),
    );
    return data;
  }
}
