import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";
import { Campaign } from "@/entity/Campaign";
import { VoucherDto } from "./voucher/dto/voucher.node";
import { CampaignDto } from "./campaign/dto/campaign.node";

@Resolver()
export class VoucherResolver {
  private campaignRepo = myDataSource.getRepository(Campaign);
  private voucherRepo = myDataSource.getRepository(Voucher);

  @Query(() => String, { name: "hello", description: "Returns a greeting" })
  async hello() {
    return "Hello world";
  }

  @Query(() => [VoucherDto])
  async vouchers(): Promise<VoucherDto[]> {
    const vouchers = await this.voucherRepo.find();
    console.log({ vouchers });
    return vouchers;
  }

  @Query(() => String)
  async validate(@Arg("voucher") voucher: string): Promise<boolean> {
    return true;
  }

  @Query(() => VoucherDto, { description: "Gets a voucher by id" })
  async getVoucher(@Arg("id") id: string): Promise<VoucherDto | null> {
    const voucher = await this.voucherRepo.findOne({ where: { id: +id } });
    return voucher;
  }

  @Mutation(() => VoucherDto)
  async createVoucher(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("campaign") campaign: string
  ): Promise<VoucherDto | null> {
    const campaignExists = await this.campaignRepo.findOne({
      where: { name: campaign },
    });

    if (!campaignExists) return null;

    const voucher = await this.voucherRepo
      .create({
        campaign: { ...campaignExists },
        name,
        description, 
      })
      .save();

    return voucher;
  }
}
