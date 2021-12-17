import * as mongoose from 'mongoose';

export const AnimeSchema = new mongoose.Schema({
  image_url: String,
  synopsis: String,
  title: String,
  year: Number,
  score: Number,
  image: String,
  title_english: { type: String, required: false },
  title_japanese: { type: String, required: false },
  type: String,
  source: String,
  episodes: Number,
  status: String,
  duration: String,
  airedString: String,
  premiered: String,
  studios: {
    type: [
      {
        name: String,
      },
    ],
    required: false,
  },
  rating: String,
  aired: [
    {
      from: String,
    },
  ],
  related: {
    Sequel: {
      type: [
        {
          mal_id: Number,
          name: String,
        },
      ],
      required: false,
    },
    Prequel: {
      type: [
        {
          mal_id: Number,
          name: String,
        },
      ],
      required: false,
    },
    Other: {
      type: [
        {
          mal_id: Number,
          name: String,
        },
      ],
      required: false,
    },
    'Alternative version': {
      type: [
        {
          mal_id: Number,
          name: String,
        },
      ],
      required: false,
    },
    'Side story': {
      type: [
        {
          mal_id: Number,
          name: String,
        },
      ],
      required: false,
    },
    required: false,
  },
});
