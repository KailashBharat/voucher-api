import { Field, InputType } from "type-graphql";
import { IsString } from "class-validator";

@InputType()
export class UpdateVoucherInput {
  @Field({ nullable: true })
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  campaignId?: string;

  @Field()
  @IsString()
  id: string;
}
