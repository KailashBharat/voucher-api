import { Campaign } from "@/entity/Campaign";
import { myDataSource } from "@/app-data-source";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CampaignDto } from "./campaign/dto/campaign.node";
import { Repository } from "typeorm";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
@Service()
@Resolver()
export class CampaignResolver {
  constructor(@InjectRepository(Campaign) private readonly campaignRepo: Repository<Campaign>) {}

  @Query(() => CampaignDto, { description: "Returns a campaign" })
  async campaign(@Arg("name") name: string): Promise<CampaignDto | null> {
    return await this.campaignRepo.findOne({ where: { name } });
  }

  @Query(() => [CampaignDto], { description: "Returns all campaigns" })
  async campaigns(): Promise<CampaignDto[] | null> {
    return await this.campaignRepo.find();
  }

  @Mutation(() => CampaignDto, { description: "Creates a campaign" })
  async create(
    @Arg("name") name: string,
    @Arg("description") description: string
  ): Promise<CampaignDto> {
    console.log({ name, description });
    return await this.campaignRepo.create({ description, name }).save();
  }
}
