import { Module } from '@nestjs/common';
import { AnimeService } from 'src/services/anime.service';
import { AnimeResolver } from './graphql/resolvers/anime.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import path from 'node:path';
import { ApiService } from 'src/services/api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
  ],
  providers: [AnimeResolver, AnimeService, ApiService],
})
export class AnimesModule {}