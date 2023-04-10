import { Field, ID, ObjectType } from "type-graphql";
import { VoucherDto } from "../../voucher/dto/voucher.node";
import { CampaignDto } from "../../campaign/dto/campaign.node";

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Number)
  age: number;

  @Field()
  ip: string;

  @Field()
  role: string;
  
  @Field()
  createdAt: Date;
  
  @Field(()=> [VoucherDto])
  vouchers: VoucherDto[];
  
  @Field(()=> [CampaignDto])
  campaigns: CampaignDto[];
}
