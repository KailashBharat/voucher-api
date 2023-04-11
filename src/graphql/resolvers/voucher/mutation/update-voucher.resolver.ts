import { Resolver, Mutation, Arg } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";
import { Campaign } from "@/entity/Campaign";
import { User } from "@/entity/User";
import { UpdateVoucherInput } from "../dto/update-voucher.input";
import { GraphQLError } from "graphql";
import { UpdateResult } from "typeorm";

@Resolver()
export class UpdateVoucherResolver {
  private voucherRepo = myDataSource.getRepository(Voucher);
  private campaignRepo = myDataSource.getRepository(Campaign);

  @Mutation(() => Number)
  async updateVoucher(
    @Arg("input") input: UpdateVoucherInput
  ): Promise<Number | null | undefined> {
    const { name, description, campaignId, id } = input;
    const campaignExists = await this.campaignRepo.findOne({
      where: { id: campaignId },
    });

    if (!campaignExists) throw new GraphQLError("Campaign does not exist");

    const voucher = await this.voucherRepo.update(
      { id },
      {
        ...(description ? { description } : {}),
        ...(name ? { name } : {}),
        ...(campaignExists ? { campaignId: campaignExists.id } : {}),
      }
    );
    return voucher.affected;
  }
}
