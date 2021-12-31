import { ExternalApiService, DatabaseService } from './';
import { SonicService } from 'src/sonic';
import { RedisCacheService } from 'src/redis';
import { Anime } from 'src/animes/entities/anime.entity';
export declare class AnimesService {
    private redisCacheService;
    private externalService;
    private databaseService;
    private sonicService;
    constructor(redisCacheService: RedisCacheService, externalService: ExternalApiService, databaseService: DatabaseService, sonicService: SonicService);
    getAnimeByTitle(title: string): Promise<Anime[] | import("rxjs").Observable<Anime[]>>;
    getRandomAnime(): Promise<Anime | import("rxjs").Observable<Anime>>;
}
