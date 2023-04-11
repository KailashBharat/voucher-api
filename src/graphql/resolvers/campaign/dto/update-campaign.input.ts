import { IsDate, IsString } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCampaignInput {
  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsDate()
  endsAt?: Date;

  @Field()
  @IsString()
  id: string;
}
