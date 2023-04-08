import { myDataSource } from "../../app-data-source";
import { Campaign } from "../../entity/Campaign";
import { Resolver, Query, Arg, Mutation } from "type-graphql";

@Resolver()
export class CampaignResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);

  @Query(() => Campaign, { description: "Returns a campaign" })
  async campaign(@Arg("name") name: string): Promise<Campaign | null> {
    return await this.campaignRepo.findOne({ where: { name } });
  }

  @Query(() => [Campaign], { description: "Returns all campaigns" })
  async campaigns(): Promise<Campaign[] | null> {
    return await this.campaignRepo.find();
  }

  @Mutation(() => Campaign, { description: "Creates a campaign" })
  async create(
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<Campaign> {
    console.log({ name, description });
    return await this.campaignRepo.create({ description, name }).save();
  }
}
