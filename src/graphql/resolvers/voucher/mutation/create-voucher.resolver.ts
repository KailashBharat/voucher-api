import { Resolver, Query, Mutation, Arg} from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";
import { VoucherDto, VoucherInput } from "../dto";
import { Campaign } from "@/entity/Campaign";

@Resolver()
export class CreateVoucherResolver {
  private voucherRepo = myDataSource.getRepository(Voucher);
  private campaignRepo = myDataSource.getRepository(Campaign);


  @Mutation(() => VoucherDto)
  async createVoucher(
    @Arg("input") input: VoucherInput
  ): Promise<VoucherDto | null> {
    const campaignExists = await this.campaignRepo.findOne({
      where: { name: input.campaign },
    });

    if (!campaignExists) return null;

    const voucher = await this.voucherRepo
      .create({
        campaignId: campaignExists.id,
        name: input.name,
        description: input.description,
      })
      .save();

    return voucher;
  }
}
