export interface ISearchAnimeById {
  mal_id: number;
}

export interface IResponseAnime {
  mal_id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  year: number;
  score: number;
  type: string;
  source: string;
  images: {
    jpg: { image_url: string };
  };
  synopsis: string;
  status: string;
  duration: string;
  aired: {
    string: string;
  };
  premiered: string;
  rating: string;
  episodes: number | null;
}

export interface IAnime {
  mal_id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  year: number;
  score: number;
  type: string;
  source: string;
  image_url: string;
  synopsis: string;
  status: string;
  duration: string;
  slug: string;
  aired_string: string;
  premiered: string;
  rating: string;
  episodes: number | null;
}

export interface IQuote {
  mal_id?: number;
  anime: string;
  character: string;
  quote: string;
}

export interface ITop {
  mal_id: number;
  title: string;
  rank: number;
}

export interface IRanking {
  top: ITop[];
}