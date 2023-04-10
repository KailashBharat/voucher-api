import { Resolver, Mutation, Arg, Authorized } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Campaign } from "@/entity/Campaign";
import { CampaignDto, CampaignInput } from "../dto";
import { User } from "@/entity/User";
@Resolver()
export class CreateCampaignResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);
  private userRepo = myDataSource.getRepository(User);

  // @Authorized("ADMIN")
  @Mutation(() => CampaignDto)
  async createCampaign(@Arg("input") input: CampaignInput): Promise<CampaignDto> {
    const { description, name, userId } = input;

    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new Error("Invalid userId");
    }

    const campaign = await this.campaignRepo.create({ description, name, userId }).save();
    console.log({campaign})
  
  return campaign
  }

}
