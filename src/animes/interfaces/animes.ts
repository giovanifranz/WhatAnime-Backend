export interface AnimeByTitle {
  mal_id: number
  title: string
  image_url: string
  score: number
  episodes: number
  synopsis: string
  year: number
  start_date: string
}

export interface Quote {
  mal_id?: number
  anime: string
  character: string
  quote: string
}

export interface Ranking {
  top: Top[]
}

export interface Top {
  mal_id: number
  title: string
  rank: number
}
