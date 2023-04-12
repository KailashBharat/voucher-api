import { Resolver, Mutation, Arg} from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Campaign } from "@/entity/Campaign";
import { User } from "@/entity/User";
import { UpdateCampaignInput } from "../dto/update-campaign.input";

@Resolver()
export class UpdateCampaignResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);

  @Mutation(() => Number)
  async updateCampaign(
    @Arg("input") input: UpdateCampaignInput
  ): Promise<number | null| undefined> {
    const { description, name, id, endsAt } = input;

    const campaign = await this.campaignRepo.update(
      { id },
      {
        ...(description ? { description } : {}),
        ...(name ? { name } : {}),
        ...(endsAt ? { endsAt } : {}),
      }
    );
    return campaign.affected;
  }
}
