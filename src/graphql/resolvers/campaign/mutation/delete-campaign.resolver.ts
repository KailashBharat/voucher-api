import { Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Campaign } from "@/entity/Campaign";
import { User } from "@/entity/User";
import { DeleteResult } from "typeorm";
@Resolver()
export class DeleteCampaignResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);

  // @Authorized("ADMIN")
  @Mutation(() => Number)
  async deleteCampaign(
    @Arg("id") id: string
  ): Promise<number | null| undefined> {
    const campaign = await this.campaignRepo.delete({ id });
    return campaign.affected;
  }
}
