export class AnimeById {
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
      type: string;
    }[];
    Prequel?: {
      mal_id: number;
      name: string;
      type: string;
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

export class AnimeByTitle {
  mal_id: number;
  title: string;
  image_url: string;
  score: number;
  episodes: number;
  synopsis: string;
  year: number;
  start_date: string;
}

export class Quote {
  mal_id?: number;
  anime: string;
  character: string;
  quote: string;
}
