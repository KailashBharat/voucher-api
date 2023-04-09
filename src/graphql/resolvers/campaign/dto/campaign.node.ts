import { Voucher } from "../../../../entity/Voucher";
import { IsDate, isDate } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { VoucherDto } from "../../voucher/dto/voucher.node";

@ObjectType()
export class CampaignDto {
  @Field()
  id: number;

  @Field(() => [VoucherDto])
  vouchers: VoucherDto[];

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
