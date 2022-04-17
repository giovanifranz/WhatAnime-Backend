import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { formatText, formatTitleForQuote } from 'src/common'
import { AnimeService, QuoteService } from 'src/services'

import { Anime } from '../models'

@Resolver(() => Anime)
export class AnimeResolver {
  @InjectPinoLogger(AnimeResolver.name) private readonly logger: PinoLogger

  constructor(private readonly animeService: AnimeService, private readonly quoteService: QuoteService) {}

  @Query(() => Anime)
  async searchAnimeById(@Args('id') id: number) {
    return await this.animeService.searchAnimeById(id)
  }

  @Query(() => [Anime])
  async searchAnimesByTitle(@Args('title') title: string) {
    return await this.animeService.searchAnimesByTitle(formatText(title))
  }

  @ResolveField()
  async quotes(@Parent() anime: Anime) {
    return await this.quoteService.getAnimesQuoteByTitle(formatTitleForQuote(anime.title))
  }
}
