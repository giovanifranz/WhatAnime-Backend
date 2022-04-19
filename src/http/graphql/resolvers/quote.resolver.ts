import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { tap } from 'rxjs'
import { formatText, formatTitleForQuote } from 'src/common'
import { catchException } from 'src/common/catch.exception'
import { AnimeService, QuoteService } from 'src/services'

import { Quote } from '../models'

@Resolver(() => Quote)
export class QuoteResolver {
  @InjectPinoLogger(QuoteResolver.name) private readonly logger: PinoLogger

  constructor(private readonly quoteService: QuoteService, private readonly animeService: AnimeService) {}

  @Query(() => Quote)
  getRandomAnimeQuote() {
    return this.quoteService.getRandomAnimeQuote().pipe(
      tap((quote) => this.logger.info({ quote }, 'Retornando quote aleatório')),
      catchException((error) => this.logger.error({ error }, 'Erro ao buscar quote aleatório')),
    )
  }

  @Query(() => [Quote])
  getAnimesQuoteByTitle(@Args('title') title: string) {
    return this.quoteService.getAnimesQuoteByTitle(formatTitleForQuote(title))
  }

  @ResolveField()
  animes(@Parent() quote: Quote) {
    return this.animeService.searchAnimesByTitle(formatText(quote.title))
  }
}
