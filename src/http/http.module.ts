import path from "node:path";
import { Module } from "@nestjs/common";
import { ApolloDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { HttpModule } from "@nestjs/axios";
import { AnimeService } from "src/services/anime.service";
import { AnimeResolver } from "./graphql/resolvers/anime.resolver";
import { QuoteResolver } from "./graphql/resolvers/quote.resolver";
import { DatabaseModule } from "src/database/database.module";
import { QuoteService } from "src/services/quote.service";
import { JikanClient } from "src/client/jikan.client";
import { AnimechanClient } from "src/client/animechan.client";

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot({
      cors: true,
      credentials: true,
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), "src/schema.gql"),
    }),
    DatabaseModule,
  ],
  providers: [
    AnimeResolver,
    QuoteResolver,

    JikanClient,
    AnimechanClient,
    AnimeService,
    QuoteService,
  ],
})
export class AnimesModule {}
