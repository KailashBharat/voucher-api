import { Resolver, Mutation, Arg} from "type-graphql";
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
  async createCampaign(
    @Arg("input") input: CampaignInput
  ): Promise<CampaignDto> {
    const { description, name, userId, endsAt } = input;

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw Error("Invalid User");
    }

    const campaign = await this.campaignRepo
      .create({
        description,
        name,
        userId,
        ...(endsAt ? { endsAt: new Date(endsAt) } : {}),
      })
      .save();
    return campaign;
  }
}
