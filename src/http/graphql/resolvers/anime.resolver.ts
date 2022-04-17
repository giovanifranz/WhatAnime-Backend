import { Resolver, Query, Args } from "@nestjs/graphql";
import { AnimeService } from "src/services/anime.service";
import { Anime } from "../models/anime";

@Resolver()
export class AnimeResolver {
  constructor(private readonly animeService: AnimeService) {}

  @Query(() => Anime)
  async searchAnimeById(@Args("id") id: number) {
    return await this.animeService.searchAnimeById(id);
  }

  @Query(() => [Anime])
  async searchAnimesByTitle(@Args("title") title: string) {
    return await this.animeService.searchAnimesByTitle(title);
  }
}
