import { Campaign } from "@/entity/Campaign";
import { myDataSource } from "@/app-data-source";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CampaignDto } from "./campaign/dto/campaign.node";

@Resolver()
export class CampaignResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);

  @Query(() => CampaignDto, { description: "Returns a campaign" })
  async campaign(@Arg("name") name: string): Promise<CampaignDto | null> {
    return await this.campaignRepo.findOne({ where: { name } });
  }

  @Query(() => [CampaignDto], { description: "Returns all campaigns" })
  async campaigns(): Promise<CampaignDto[] | null> {
    return await this.campaignRepo.find();
  }

  @Mutation(() => CampaignDto, { description: "Creates a campaign" })
  async create(
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<CampaignDto> {
    console.log({ name, description });
    return await this.campaignRepo.create({ description, name }).save();
  }
}
