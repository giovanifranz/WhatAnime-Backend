import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Anime {
  @Field()
  mal_id: number;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  title_english: string;

  @Field({ nullable: true })
  title_japanese: string;

  @Field()
  year: number;

  @Field()
  score: number;

  @Field()
  type: string;

  @Field()
  source: string;

  @Field()
  image_url: string;

  @Field({ nullable: true })
  synopsis: string;

  @Field()
  status: string;

  @Field()
  duration: string;

  @Field()
  aired_string: string;

  @Field({ nullable: true })
  premiered: string;

  @Field()
  rating: string;

  @Field({ nullable: true })
  episodes?: number;
}

