import { Resolver, Query, Mutation, Arg, Args } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Campaign } from "@/entity/Campaign";
import { CampaignDto } from "../dto";

@Resolver()
export class CampaignResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);

  @Query(() => CampaignDto, { description: "Returns a campaign" })
  async campaign(@Arg("name") name: string): Promise<CampaignDto | null> {
    return await this.campaignRepo.findOne({ where: { name } });
  }
}