import { Field, InputType } from "type-graphql";
import { IsString } from "class-validator";

@InputType()
export class VoucherInput {
  @Field()
  @IsString()
  name: string;
  
  @Field()
  @IsString()
  description: string;
  
  @Field()
  @IsString()
  campaign: string;
  
  @Field()
  @IsString()
  userId: string;
}
