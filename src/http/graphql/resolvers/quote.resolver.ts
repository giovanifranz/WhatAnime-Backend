import { Resolver, Query, Args, ResolveField, Parent } from "@nestjs/graphql";
import { AnimeService } from "src/services/anime.service";
import { QuoteService } from "src/services/quote.service";
import { Quote } from "../models/quote";

@Resolver(() => Quote)
export class QuoteResolver {
  constructor(private readonly quoteService: QuoteService,
      private readonly animeService: AnimeService
    ) {}

  @Query(() => Quote)
  getRandomAnimeQuote() {
    return this.quoteService.getRandomAnimeQuote();
  }

  @Query(() => [Quote])
  async getAnimesQuoteByTitle(@Args("title") title: string) {
    return await this.quoteService.getAnimesQuoteByTitle(title);
  }

  @ResolveField()
  async animes(@Parent() quote: Quote) {
    return await this.animeService.searchAnimesByTitle(quote.title);
  }
}
