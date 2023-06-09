import { IsDate, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CampaignInput {
  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  userId: string;

  @Field({ nullable: true })
  @IsDate()
  endsAt?: Date;
}
