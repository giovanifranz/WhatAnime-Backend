import * as mongoose from 'mongoose';

export const AnimeSchema = new mongoose.Schema({
  image_url: String,
  synopsis: String,
  title: String,
  year: Number,
  score: Number,
  image: String,
  title_english: String,
  title_japanese: String,
  type: String,
  source: String,
  episodes: Number,
  status: String,
  duration: String,
  airedString: String,
  premiered: String,
  studios: [
    {
      name: String,
    },
  ],
  rating: String,
  aired: [
    {
      from: String,
    },
  ],
  related: {
    Sequel: [
      {
        mal_id: Number,
        name: String,
        type: String,
      },
    ],
    Prequel: [
      {
        mal_id: Number,
        name: String,
        type: String,
      },
    ],
    Other: [
      {
        mal_id: Number,
        name: String,
      },
    ],
    'Alternative version': [
      {
        mal_id: Number,
        name: String,
      },
    ],
    'Side story': [
      {
        mal_id: Number,
        name: String,
      },
    ],
  },
});
