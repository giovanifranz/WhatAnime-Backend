import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { IAnime, IResponseAnime } from "src/interfaces/anime-interface";
import { formatSlug } from "src/common/mappers";

@Injectable()
export class JikanClient {
  private jikanAPI = "https://api.jikan.moe/v4";

  constructor(private httpService: HttpService) {}

  private animeMapper(response: IResponseAnime): IAnime {
    return {
      mal_id: response.mal_id,
      title: response.title.toLowerCase(),
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
      year: response.year ? response.year : response.aired.prop.from.year,
      aired_string: response.aired.string,
      slug: formatSlug(response.title),
      synopsis: response.synopsis
        ? response.synopsis.replace(" [Written by MAL Rewrite]", "")
        : null,
    };
  }

  getAnimesByTitleOnJikan(title: string) {
    return this.httpService
      .get(`${this.jikanAPI}/anime?q=${title}&order_by=score&&sort=desc`)
      .pipe(
        map(({ data: results }) => {
          const data: IResponseAnime[] = results.data;
          return data.map((response) => {
            return this.animeMapper(response);
          });
        })
      );
  }

  getAnimeByIdOnJikan(mal_id: number): Observable<IAnime> {
    return this.httpService.get(`${this.jikanAPI}/anime/${mal_id}`).pipe(
      map(({ data }) => {
        const { data: response } = data;
        return this.animeMapper(response);
      })
    );
  }

  getAnimeRandom(): Observable<IAnime> {
    return this.httpService.get(`${this.jikanAPI}/random/anime`).pipe(
      map(({ data }) => {
        const { data: response } = data;
        return this.animeMapper(response);
      })
    );
  }

  getAnimeTop(): Observable<Array<IAnime>> {
    return this.httpService.get(`${this.jikanAPI}/top/anime`).pipe(
      map(({ data }) => {
        const { data: results } = data;
        return results.data.map((response: IResponseAnime) => {
          return this.animeMapper(response);
        });
      })
    );
  }
}
