import { IsDate } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { CampaignDto } from "../../campaign/dto/campaign.node";
import { UserDto } from "../../user/dto/user.node";

@ObjectType()
export class VoucherDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => CampaignDto, {defaultValue: null, nullable:true})
  campaign: CampaignDto;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field({ defaultValue: null, nullable: true })
  @IsDate()
  usedAt: Date;

  @Field(()=> UserDto, { defaultValue: null, nullable: true })
  usedBy: UserDto;
}
