import { Voucher } from "../../../../entity/Voucher";
import { IsDate, isDate } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CampaignDto {
  @Field()
  id: number;

  @Field(() => [Voucher])
  vouchers: Voucher[];

  @Field()
  description: string;

  @Field()
  name: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field({ defaultValue: null, nullable: true })
  @IsDate()
  endsAt: Date;
}
