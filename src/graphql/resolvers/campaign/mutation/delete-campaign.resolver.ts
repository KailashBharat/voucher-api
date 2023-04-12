import { Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Campaign } from "@/entity/Campaign";

@Resolver()
export class DeleteCampaignResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);

  @Authorized("ADMIN")
  @Mutation(() => Number)
  async deleteCampaign(
    @Arg("id") id: string
  ): Promise<number | null| undefined> {
    const campaign = await this.campaignRepo.delete({ id });
    return campaign.affected;
  }
}
