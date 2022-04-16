import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Quote {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field()
  character: string;
  
  @Field()
  quote: string;
}


