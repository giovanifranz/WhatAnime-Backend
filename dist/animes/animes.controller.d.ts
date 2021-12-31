import { AnimesService, ExternalApiService } from './services';
import { SonicService } from 'src/sonic';
export declare class AnimesController {
    private readonly animesService;
    private readonly sonicService;
    private readonly externalApiService;
    constructor(animesService: AnimesService, sonicService: SonicService, externalApiService: ExternalApiService);
    getAnimeByTitle(title: string): Promise<import("./entities/anime.entity").Anime[] | import("rxjs").Observable<import("./entities/anime.entity").Anime[]>>;
    getRandomAnime(): Promise<import("./entities/anime.entity").Anime | import("rxjs").Observable<import("./entities/anime.entity").Anime>>;
    getAnimeForSonic(reqParam: string): Promise<import("./entities/anime.entity").Anime[]>;
    getSuggestForSonic(reqParam: string): Promise<string>;
    getTopAiring(): Promise<import("./entities/anime.entity").Top[] | import("rxjs").Observable<import("./entities/anime.entity").Top[]>>;
    getTopPopular(): Promise<import("./entities/anime.entity").Top[] | import("rxjs").Observable<import("./entities/anime.entity").Top[]>>;
}
