import { Field, ObjectType } from '@nestjs/graphql'

import { Anime } from './anime'

@ObjectType()
export class Quote {
  @Field()
  slug: string

  @Field()
  title: string

  @Field()
  character: string

  @Field()
  quote: string

  @Field(() => [Anime])
  animes?: Anime
}
