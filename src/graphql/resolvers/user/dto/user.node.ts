import { Field, ID, ObjectType } from "type-graphql";
import { VoucherDto } from "../../voucher/dto/voucher.node";
import { CampaignDto } from "../../campaign/dto/campaign.node";

@ObjectType()
export class UserDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;

  @Field()
  ip: string;

  @Field()
  role: string;
  
  @Field()
  createdAt: Date;
  
  @Field(()=> [VoucherDto], {nullable:true})
  vouchers: VoucherDto[];
  
  @Field(()=> [CampaignDto],{nullable:true})
  campaigns: CampaignDto[];
}
