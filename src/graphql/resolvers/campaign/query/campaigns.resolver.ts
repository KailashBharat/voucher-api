import { Resolver, Query } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Campaign } from "@/entity/Campaign";
import { CampaignDto } from "../dto/campaign.node";

@Resolver()
export class CampaignsResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);

  @Query(() => [CampaignDto], { description: "Returns all campaigns" })
  async campaigns(): Promise<CampaignDto[] | null> {
    return await this.campaignRepo.find({relations: ["vouchers", "vouchers.campaign", "createdBy"]});
  }
}
