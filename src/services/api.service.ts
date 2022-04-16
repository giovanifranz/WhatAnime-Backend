import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { IAnime, IQuote, IResponseAnime } from "src/interfaces/anime-interface";
import slugify from "slugify";
import { animeChan, jikanAPI } from "src/client";

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  getAnimeByTitleOnJikan(title: string): Observable<Array<IAnime>> {
    return this.httpService.get(`${jikanAPI}/anime?q=${title}`).pipe(
      map((response) => {
        return response.data.results.map((response: IResponseAnime) => {
          return {
            mal_id: response.mal_id,
            title: response.title,
            title_english: response.title_english,
            title_japanese: response.title_japanese,
            score: response.score,
            type: response.type,
            source: response.source,
            image_url: response.images.jpg.image_url,
            status: response.status,
            duration: response.duration,
            premiered: response.premiered,
            rating: response.rating,
            episodes: response.episodes,
            year: response.year,
            aired_string: response.aired.string,
            slug: slugify(response.title, { lower: true }),
            synopsis: response.synopsis.replace(
              " [Written by MAL Rewrite]",
              ""
            ),
          };
        });
      })
    );
  }

  getAnimeByIdOnJikan(mal_id: number): Observable<IAnime> {
    return this.httpService.get(`${jikanAPI}/anime/${mal_id}`).pipe(
      map(({data}) => {
        const { data : response} = data;
        return {
          mal_id: response.mal_id,
          title: response.title,
          title_english: response.title_english,
          title_japanese: response.title_japanese,
          score: response.score,
          type: response.type,
          source: response.source,
          image_url: response.images.jpg.image_url,
          status: response.status,
          duration: response.duration,
          premiered: response.premiered,
          rating: response.rating,
          episodes: response.episodes,
          year: response.year,
          aired_string: response.aired.string,
          slug: slugify(response.title, { lower: true }),
          synopsis: response.synopsis.replace(" [Written by MAL Rewrite]", ""),
        } as IAnime;
      })
    );
  }

  getRandomAnime(): Observable<IAnime> {
    return this.httpService.get(`${jikanAPI}/random/anime`).pipe(
      map(({data}) => {
        const { data : response} = data;
        return {
          mal_id: response.mal_id,
          title: response.title,
          title_english: response.title_english,
          title_japanese: response.title_japanese,
          score: response.score,
          type: response.type,
          source: response.source,
          image_url: response.images.jpg.image_url,
          status: response.status,
          duration: response.duration,
          premiered: response.premiered,
          rating: response.rating,
          episodes: response.episodes,
          year: response.year,
          aired_string: response.aired.string,
          slug: slugify(response.title, { lower: true }),
          synopsis: response.synopsis.replace(" [Written by MAL Rewrite]", ""),
        } as IAnime;
      })
    );
  }

  getTopAnime(): Observable<Array<IAnime>> {
    return this.httpService.get(`${jikanAPI}/top/anime`).pipe(
      map((response) => {
        return response.data.results.map((response: IResponseAnime) => {
          return {
            mal_id: response.mal_id,
            title: response.title,
            title_english: response.title_english,
            title_japanese: response.title_japanese,
            score: response.score,
            type: response.type,
            source: response.source,
            image_url: response.images.jpg.image_url,
            status: response.status,
            duration: response.duration,
            premiered: response.premiered,
            rating: response.rating,
            episodes: response.episodes,
            year: response.year,
            aired_string: response.aired.string,
            slug: slugify(response.title, { lower: true }),
            synopsis: response.synopsis.replace(
              " [Written by MAL Rewrite]",
              ""
            ),
          };
        });
      })
    );
  }

  getQuote(): Observable<IQuote> {
    const data = this.httpService
      .get(animeChan)
      .pipe(map((response: AxiosResponse<IQuote>) => response.data));
    return data;
  }
}
