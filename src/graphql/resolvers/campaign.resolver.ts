import { Campaign } from "@/entity/Campaign";
import { myDataSource } from "@/app-data-source";
import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { CampaignDto } from "./campaign/dto/campaign.node";
import { CampaignInput } from "./campaign/dto/campaign.input";

@Resolver()
export class CampaignResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);

  @Query(() => CampaignDto, { description: "Returns a campaign" })
  async campaign(@Arg("name") name: string): Promise<CampaignDto | null> {
    return await this.campaignRepo.findOne({ where: { name } });
  }

  @Authorized("ADMIN")
  @Query(() => [CampaignDto], { description: "Returns all campaigns" })
  async campaigns(): Promise<CampaignDto[] | null> {
    return await this.campaignRepo.find();
  }

  @Authorized("ADMIN")
  @Mutation(() => CampaignDto, { description: "Creates a campaign" })
  async create(@Arg("input") input: CampaignInput): Promise<CampaignDto> {
    const { description, name } = input;
    return await this.campaignRepo.create({ description, name }).save();
  }
}
