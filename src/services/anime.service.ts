import { Injectable } from '@nestjs/common'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { switchMap, tap } from 'rxjs'
import { JikanClient } from 'src/client'
import { catchException } from 'src/common'
import { PrismaService } from 'src/database'

@Injectable()
export class AnimeService {
  @InjectPinoLogger(AnimeService.name) private readonly logger: PinoLogger
  constructor(private prisma: PrismaService, private jikanClient: JikanClient) {}

  async searchAnimeById(mal_id: number) {
    const animeAlreadyExists = await this.prisma.anime.findUnique({
      where: { mal_id },
    })

    if (!animeAlreadyExists) {
      return this.searchAnimeByIdInExternalApi(mal_id).pipe(
        tap((anime) => this.logger.info({ anime }, 'Retornando anime por mal_id em API externa')),
        catchException((error) => this.logger.error({ error }, 'Erro ao buscar anime em API externa')),
      )
    }

    this.logger.info({ animeAlreadyExists }, 'Retornando anime a partir do banco de dados')
    return animeAlreadyExists
  }

  searchAnimeByIdInExternalApi(mal_id: number) {
    return this.jikanClient.getAnimeByIdOnJikan(mal_id).pipe(
      switchMap(async (anime) => {
        return await Promise.resolve(this.prisma.anime.create({ data: { ...anime } }))
      }),
      catchException((error) => this.logger.error({ error }, 'Erro ao salvar anime no banco de dados')),
    )
  }

  async searchAnimesByTitle(title: string) {
    const animesAlreadyExists = await this.prisma.anime.findMany({
      where: { title: { contains: title }, score: { not: null } },
      orderBy: { score: 'desc' },
    })

    if (!animesAlreadyExists.length) {
      return this.searchAnimesByTitleInExternalApi(title).pipe(
        tap((animes) => this.logger.info({ animes }, 'Retornando animes por título em API externa')),
        catchException((error) => this.logger.error({ error }, 'Erro ao buscar animes em API externa')),
      )
    }

    this.logger.info({ animesAlreadyExists }, 'Retornando animes a partir do banco de dados')
    return animesAlreadyExists
  }

  searchAnimesByTitleInExternalApi(title: string) {
    return this.jikanClient.getAnimesByTitleOnJikan(title).pipe(
      switchMap(async (animes) => {
        return animes.map(async (anime) => {
          const animeAlreadyExistisInDatabase = await this.prisma.anime.findUnique({
            where: { mal_id: anime.mal_id },
          })

          if (animeAlreadyExistisInDatabase) {
            return animeAlreadyExistisInDatabase
          }

          if (!animeAlreadyExistisInDatabase) {
            return await this.prisma.anime.create({
              data: { ...anime },
            })
          }
        })
      }),
      switchMap(async (animes) => {
        return await Promise.all(animes)
      }),
      catchException((error) => this.logger.error({ error }, 'Erro ao salvar animes no banco de dados')),
    )
  }
}
