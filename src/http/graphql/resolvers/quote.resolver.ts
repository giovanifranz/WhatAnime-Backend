import { Resolver, Query, Args, ResolveField, Parent } from "@nestjs/graphql";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { tap } from "rxjs";
import { catchException } from "src/common/catch.exception";
import { AnimeService } from "src/services/anime.service";
import { QuoteService } from "src/services/quote.service";
import { Quote } from "../models/quote";
import { formatText, formatTitleForQuote } from "src/common/mappers";

@Resolver(() => Quote)
export class QuoteResolver {
  @InjectPinoLogger(QuoteResolver.name) private readonly logger: PinoLogger;

  constructor(
    private readonly quoteService: QuoteService,
    private readonly animeService: AnimeService
  ) {}

  @Query(() => Quote)
  getRandomAnimeQuote() {
    return this.quoteService.getRandomAnimeQuote().pipe(
      tap((quote) => this.logger.info({ quote }, "Retornando quote aleatório")),
      catchException((error) =>
        this.logger.error({ error }, "Erro ao buscar quote aleatório")
      )
    );
  }

  @Query(() => [Quote])
  async getAnimesQuoteByTitle(@Args("title") title: string) {
    return await this.quoteService.getAnimesQuoteByTitle(
      formatTitleForQuote(title)
    );
  }

  @ResolveField()
  async animes(@Parent() quote: Quote) {
    return await this.animeService.searchAnimesByTitle(formatText(quote.title));
  }
}
