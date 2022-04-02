import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type AnimeDocument = Anime & Document

@Schema({ collection: 'animes', autoCreate: false })
export class Anime {
  @Prop()
  mal_id: number

  @Prop()
  image_url: string

  @Prop()
  synopsis: string

  @Prop()
  title: string

  @Prop()
  year: number

  @Prop()
  score: number

  @Prop()
  image: string

  @Prop()
  title_english?: string

  @Prop()
  title_japanese?: string

  @Prop()
  type: string

  @Prop()
  source: string

  @Prop()
  episodes: number

  @Prop()
  status: string

  @Prop()
  duration: string

  @Prop()
  airedString: string

  @Prop()
  premiered: string

  @Prop(raw({ name: { type: String, required: false } }))
  studios?: {
    name: string
  }[]

  @Prop()
  rating: string

  @Prop(raw({ from: { type: String } }))
  aired: {
    from: string
  }

  @Prop(
    raw({
      Sequel: {
        type: [{ mald_id: { type: Number }, name: { type: String } }],
        required: false
      },
      Prequel: {
        type: [{ mald_id: { type: Number }, name: { type: String } }],
        required: false
      },
      Other: {
        type: [{ mald_id: { type: Number }, name: { type: String } }],
        required: false
      },
      'Alternative version': {
        type: [{ mald_id: { type: Number }, name: { type: String } }],
        required: false
      },
      'Side story': {
        type: [{ mald_id: { type: Number }, name: { type: String } }],
        required: false
      }
    })
  )
  related?: {
    Sequel?: {
      mal_id: number
      name: string
    }[]
    Prequel?: {
      mal_id: number
      name: string
    }[]
    Other?: {
      mal_id: number
      name: string
    }[]
    'Alternative version'?: {
      mal_id: number
      name: string
    }[]
    'Side story'?: {
      mal_id: number
      name: string
    }[]
  }
}

export const AnimeSchema = SchemaFactory.createForClass(Anime)
