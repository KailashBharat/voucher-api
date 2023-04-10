import { Field, InputType } from "type-graphql";

@InputType()
export class CampaignInput {
  @Field()
  description: string;

  @Field()
  name: string;

  @Field()
  userId: string;
}
