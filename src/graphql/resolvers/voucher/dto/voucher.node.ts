import { Campaign } from "@//entity/Campaign";
import { IsDate } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class VoucherDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Campaign)
  campaign: Campaign;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field({ defaultValue: null, nullable: true })
  @IsDate()
  usedAt: Date;

  @Field({ defaultValue: null, nullable: true })
  usedBy: String;
}
