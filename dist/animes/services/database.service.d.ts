import { Model } from 'mongoose';
import { Anime } from '../entities/anime.entity';
import { CreateAnimeDto } from '../dto/create-anime.dto';
export declare class DatabaseService {
    private readonly animeModel;
    constructor(animeModel: Model<Anime>);
    createInDatabases(anime: CreateAnimeDto): Promise<Anime>;
}
