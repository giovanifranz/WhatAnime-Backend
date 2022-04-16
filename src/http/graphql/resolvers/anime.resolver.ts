import { Resolver, Query, Args } from "@nestjs/graphql";
import { AnimeService } from "src/services/anime.service";
import { CreateAnimeInput } from "../inputs/create-anime-input";
import { Anime } from "../models/anime";

@Resolver()
export class AnimeResolver {
  constructor(private readonly animeService: AnimeService) {}

  @Query(() => Anime)
  async searchById(@Args('data') data: CreateAnimeInput) {
    return await this.animeService.searchById(data);
  }
}
