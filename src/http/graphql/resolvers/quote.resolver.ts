import { Resolver, Query, Args } from "@nestjs/graphql";
import { QuoteService } from "src/services/quote.service";
import { Quote } from "../models/quote";

@Resolver()
export class QuoteResolver {
  constructor(private readonly quoteService: QuoteService) {}

  @Query(() => Quote)
  getRandomAnimeQuote() {
    return this.quoteService.getRandomAnimeQuote();
  }

  @Query(() => [Quote])
  getAnimesQuoteByTitle(@Args("title") title: string) {
    return this.quoteService.getAnimesQuoteByTitle(title);
  }
}
