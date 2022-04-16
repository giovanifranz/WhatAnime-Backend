import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAnimeInput {
  @Field()
  mal_id: number;
}
