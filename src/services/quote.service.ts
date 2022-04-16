import { Injectable } from "@nestjs/common";
import { switchMap } from "rxjs";
import { PrismaService } from "src/database/prisma/prisma.service";
import { ApiService } from "./api.service";

@Injectable()
export class QuoteService {
  constructor(private apiService: ApiService, private prisma: PrismaService) {}

  getRandomAnimeQuote() {
    return this.apiService.getRandomAnimeQuote().pipe(
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
      })
    );
  }

  getAnimesQuoteByTitle(title: string) {
    return this.apiService.getAnimesQuoteByTitle(title).pipe(
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
      })
    );
  }
}
