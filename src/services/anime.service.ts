import { Injectable } from "@nestjs/common";
import { map } from "rxjs";
import { PrismaService } from "src/database/prisma/prisma.service";
import { IAnime } from "../interfaces/anime-interface";
import { ApiService } from "./api.service";

@Injectable()
export class AnimeService {
  constructor(private prisma: PrismaService, private apiService: ApiService) {}

  async searchAnimeById(mal_id: number) {
    const animeAlreadyExists = await this.prisma.anime.findUnique({
      where: { mal_id },
    });

    if (animeAlreadyExists) {
      return animeAlreadyExists;
    }

    return this.apiService.getAnimeByIdOnJikan(mal_id).pipe(
      map(async (anime: IAnime) => {
        return await this.prisma.anime.create({ data: { ...anime } });
      })
    );
  }

  async searchAnimeByTitle(title: string) {
    const animeAlreadyExists = await this.prisma.anime.findFirst({
      where: { title: { contains: title.toLowerCase() } },
    });

    if (animeAlreadyExists) {
      return animeAlreadyExists;
    }

    return this.apiService.getAnimeByTitleOnJikan(title).pipe(
      map(async (animes: IAnime[]) => {
        const AlreadyExists = await this.prisma.anime.findFirst({
          where: { mal_id: animes[0].mal_id },
        });

        if (AlreadyExists) {
          return AlreadyExists;
        }

        return await this.prisma.anime.create({ data: { ...animes[0] } });
      })
    );
  }
}
