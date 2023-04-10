import { IsDate } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { VoucherDto } from "../../voucher/dto/voucher.node";
import { UserDto } from "../../user/dto/user.node";

@ObjectType()
export class CampaignDto {
  @Field()
  id: string;

  @Field(() => [VoucherDto])
  vouchers: VoucherDto[];

  @Field()
  description: string;

  @Field()
  name: string;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field(() => UserDto, { nullable: true })
  createdBy: UserDto;

  @Field({ defaultValue: null, nullable: true })
  @IsDate()
  endsAt: Date;
}
