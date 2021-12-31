import { Document } from 'mongoose';
export declare type AnimeDocument = Anime & Document;
export declare class Anime {
    mal_id: number;
    image_url: string;
    synopsis: string;
    title: string;
    year: number;
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
}
export declare const AnimeSchema: import("mongoose").Schema<Document<Anime, any, any>, import("mongoose").Model<Document<Anime, any, any>, any, any, any>, any>;
export declare class AnimeByTitle {
    mal_id: number;
    title: string;
    image_url: string;
    score: number;
    episodes: number;
    synopsis: string;
    year: number;
    start_date: string;
}
export declare class Quote {
    mal_id?: number;
    anime: string;
    character: string;
    quote: string;
}
export declare class Ranking {
    top: Top[];
}
export declare class Top {
    mal_id: number;
    title: string;
    rank: number;
}
