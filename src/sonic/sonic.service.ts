import { Injectable } from "@nestjs/common";
import { sonicChannelSearch } from "src/config";

@Injectable()
export class SonicService {
  constructor() {}

  async getAnimeForSonic(param: string) {
    const result = await sonicChannelSearch.query(
      "anime-database",
      "animes",
      param,
      { lang: "eng" }
    );

    return JSON.stringify(Object.assign({}, result));
  }

  async getSuggestForSonic(param: string) {
    const results = await sonicChannelSearch.suggest(
      "anime-database",
      "animes",
      param,
      { limit: 5 }
    );
    return JSON.stringify(Object.assign({}, results));
  }
}
