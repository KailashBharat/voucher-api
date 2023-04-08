import { Campaign } from "../../../../entity/Campaign"
import { Query } from "type-graphql"

@Query(() => Campaign, { description: "Returns a campaign" })
async campaign(@Arg("name") name: string): Promise<Campaign | null> {
  return await this.campaignRepo.findOne({ where: { name } });
}