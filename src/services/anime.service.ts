import { Injectable } from "@nestjs/common";
import { switchMap } from "rxjs";
import { JikanClient } from "src/client/jikan.client";
import { formatText } from "src/common/mappers";
import { PrismaService } from "src/database/prisma/prisma.service";
import { IAnime } from "../interfaces/anime-interface";

@Injectable()
export class AnimeService {
  constructor(
    private prisma: PrismaService,
    private jikanClient: JikanClient
  ) {}

  async searchAnimeById(mal_id: number) {
    const animeAlreadyExists = await this.prisma.anime.findUnique({
      where: { mal_id },
    });

    if (animeAlreadyExists) {
      return animeAlreadyExists;
    }

    return this.jikanClient.getAnimeByIdOnJikan(mal_id).pipe(
      switchMap(async (anime: IAnime) => {
        return await Promise.resolve(
          this.prisma.anime.create({ data: { ...anime } }).catch((error) => {
            throw new Error(error);
          })
        );
      })
    );
  }

  async searchAnimesByTitle(title: string) {
    title = formatText(title);
    const animesAlreadyExists = await this.prisma.anime.findMany({
      where: { title: { contains: title.toLowerCase() } },
      orderBy: { score: "desc" },
    });

    if (animesAlreadyExists.length) {
      return animesAlreadyExists;
    }

    return this.jikanClient.getAnimesByTitleOnJikan(title).pipe(
      switchMap(async (animes: IAnime[]) => {
        return animes.map(async (anime) => {
          const animeAlreadyExistisInDatabase =
            await this.prisma.anime.findUnique({
              where: { mal_id: anime.mal_id },
            });

          if (animeAlreadyExistisInDatabase) {
            return animeAlreadyExistisInDatabase;
          }

          if (!animeAlreadyExistisInDatabase) {
            return await this.prisma.anime
              .create({
                data: { ...anime },
              })
              .catch((error) => {
                throw new Error(error);
              });
          }
        });
      }),
      switchMap(async (animes) => {
        return await Promise.all(animes);
      })
    );
  }
}
