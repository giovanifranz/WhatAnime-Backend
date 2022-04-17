import { Injectable } from "@nestjs/common";
import { switchMap } from "rxjs";
import { AnimechanClient } from "src/client/animechan.client";
import { formatText } from "src/common/mappers";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class QuoteService {
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
          quote = await this.prisma.quote
            .create({ data: { ...response } })
            .catch((error) => {
              throw new Error(error);
            });
        }

        return quote;
      }),
      switchMap(async (quote) => {
        return await Promise.resolve(quote);
      })
    );
  }

  async getAnimesQuoteByTitle(title: string) {
    title = formatText(title);
  
    const quotesAlreadyExist = await this.prisma.quote.findMany({
      where: { slug: { contains: title } },
    });

    if (quotesAlreadyExist.length) {
      return quotesAlreadyExist;
    }
 
    return this.animechanClient.getAnimesQuoteByTitle(title).pipe(
      switchMap((data) => {
        return data.map(async (response) => {
          let quotes = await this.prisma.quote.findMany({
            where: { slug: response.slug },
          });

          if (quotes.length) {
            return quotes;
          }

          await this.prisma.quote
            .createMany({
              data,
              skipDuplicates: true,
            })
            .catch((error) => {
              throw new Error(error);
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
