import { Injectable } from "@nestjs/common";
import { map } from "rxjs";
import { PrismaService } from "src/database/prisma/prisma.service";
import { IAnime, ISearchAnimeById } from "../interfaces/anime-interface";
import { ApiService } from "./api.service";

@Injectable()
export class AnimeService {
  constructor(
    private prisma: PrismaService,
    private apiService: ApiService
  ) {}

  async searchById({ mal_id }: ISearchAnimeById) {
    const animeAlreadyExists = await this.prisma.anime.findUnique({
      where: { mal_id },
    });

    if (animeAlreadyExists) {
      return animeAlreadyExists;
    }

    return this.apiService.getAnimeByIdOnJikan(mal_id).pipe(
      map((anime: IAnime) => {
        return this.prisma.anime.create({ data: { ...anime } });
      })
    );
  }
}
