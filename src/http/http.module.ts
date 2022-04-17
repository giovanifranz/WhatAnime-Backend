import { ApolloDriver } from '@nestjs/apollo'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import path from 'node:path'
import { AnimechanClient, JikanClient } from 'src/client'
import { DatabaseModule } from 'src/database'
import { AnimeService, QuoteService } from 'src/services'

import { AnimeResolver, QuoteResolver } from './graphql/resolvers'

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot({
      cors: true,
      credentials: true,
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
  ],
  providers: [AnimeResolver, QuoteResolver, JikanClient, AnimechanClient, AnimeService, QuoteService],
})
export class AnimesModule {}
