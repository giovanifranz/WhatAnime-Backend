import { Model } from 'mongoose';
import { Anime } from 'src/animes/entities/anime.entity';
export declare class SonicService {
    private readonly animeModel;
    constructor(animeModel: Model<Anime>);
    getAnimeForSonic(param: string): Promise<Anime[]>;
    getSuggestForSonic(param: string): Promise<string>;
}
