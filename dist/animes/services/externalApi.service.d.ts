import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { RedisCacheService } from 'src/redis';
import { Quote, AnimeByTitle, Top } from '../entities/anime.entity';
export declare class ExternalApiService {
    private redisCacheService;
    private httpService;
    constructor(redisCacheService: RedisCacheService, httpService: HttpService);
    getAnimeByTitleOnJikan(title: string): Observable<Array<AnimeByTitle>>;
    getAnimeByIdOnJikan(id: number): Observable<{
        year: number;
        synopsis: string;
        mal_id: number;
        image_url: string;
        title: string;
        score: number;
        image: string;
        title_english?: string;
        title_japanese?: string;
        type: string;
        source: string;
        episodes: number;
        status: string;
        duration: string;
        airedString: string;
        premiered: string;
        studios?: {
            name: string;
        }[];
        rating: string;
        aired: {
            from: string;
        };
        related?: {
            Sequel?: {
                mal_id: number;
                name: string;
            }[];
            Prequel?: {
                mal_id: number;
                name: string;
            }[];
            Other?: {
                mal_id: number;
                name: string;
            }[];
            'Alternative version'?: {
                mal_id: number;
                name: string;
            }[];
            'Side story'?: {
                mal_id: number;
                name: string;
            }[];
        };
    }>;
    getRandomId(): Observable<number>;
    getQuote(): Observable<Quote>;
    getTopAiring(): Promise<Top[] | Observable<Top[]>>;
    getTopPopular(): Promise<Top[] | Observable<Top[]>>;
}
