import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";
import { VoucherDto, VoucherInput } from "../dto";
import { Campaign } from "@/entity/Campaign";
import { User } from "@/entity/User";

@Resolver()
export class CreateVoucherResolver {
  private voucherRepo = myDataSource.getRepository(Voucher);
  private campaignRepo = myDataSource.getRepository(Campaign);
  private userRepo = myDataSource.getRepository(User);

  @Mutation(() => VoucherDto)
  async createVoucher(
    @Arg("input") input: VoucherInput
  ): Promise<VoucherDto | null> {
    const { name, description, campaign, userId } = input;
    const campaignExists = await this.campaignRepo.findOne({
      where: { name: campaign },
    });
    const userExists = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!campaignExists || !userExists) return null;

    const voucher = await this.voucherRepo
      .create({
        campaignId: campaignExists.id,
        name,
        description,
      })
      .save();
    console.log({ voucher });
    return voucher;
  }
}
