import { Injectable } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { switchMap, tap } from "rxjs";
import { AnimechanClient } from "src/client/animechan.client";
import { catchException } from "src/common/catch.exception";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class QuoteService {
  @InjectPinoLogger(QuoteService.name) private readonly logger: PinoLogger;

  constructor(
    private prisma: PrismaService,
    private animechanClient: AnimechanClient
  ) {}

  getRandomAnimeQuote() {
    return this.animechanClient.getRandomAnimeQuote().pipe(
      switchMap(async (response) => {
        let quote = await this.prisma.quote.findFirst({
          where: { quote: { equals: response.quote } },
        });

        if (!quote) {
          quote = await this.prisma.quote.create({ data: { ...response } });
        }

        return quote;
      }),
      switchMap(async (quote) => {
        return await Promise.resolve(quote);
      }),
      catchException((error) =>
        this.logger.error(
          { error },
          "Erro ao salvar random quote no banco de dados"
        )
      )
    );
  }

  getAnimesQuoteByTitleInExternalApi(title: string) {
    return this.animechanClient.getAnimesQuoteByTitle(title).pipe(
      switchMap((data) => {
        return data.map(async (response) => {
          let quotes = await this.prisma.quote.findMany({
            where: { slug: response.slug },
          });

          if (quotes.length) {
            return quotes;
          }

          await this.prisma.quote.createMany({
            data,
            skipDuplicates: true,
          });

          quotes = await this.prisma.quote.findMany({
            where: { slug: response.slug },
          });
          return quotes;
        });
      }),
      switchMap(async (quotes) => {
        return await Promise.resolve(quotes);
      }),
      catchException((error) =>
        this.logger.error({ error }, "Erro ao salvar quotes no banco de dados")
      )
    );
  }

  async getAnimesQuoteByTitle(title: string) {
    const quotesAlreadyExist = await this.prisma.quote.findMany({
      where: { slug: { contains: title } },
    });

    if (!quotesAlreadyExist.length) {
      return this.getAnimesQuoteByTitleInExternalApi(title).pipe(
        tap((quotes) =>
          this.logger.info({ quotes }, "Retornando quotes de API externa")
        ),
        catchException((error) =>
          this.logger.error({ error }, "Erro ao buscar quotes de API externa")
        )
      );
    }

    this.logger.info(
      { quotesAlreadyExist },
      "Retornando quotes a partir do banco de dados"
    );

    return quotesAlreadyExist;
  }
}
