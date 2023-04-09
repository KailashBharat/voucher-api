import { IsDate } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import { CampaignDto } from "../../campaign/dto/campaign.node";

@ObjectType()
export class VoucherDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => CampaignDto)
  campaign: CampaignDto;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field({ defaultValue: null, nullable: true })
  @IsDate()
  usedAt: Date;

  @Field({ defaultValue: null, nullable: true })
  usedBy: String;
}
