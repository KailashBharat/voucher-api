import { Resolver,  Mutation, Arg } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";
import { Campaign } from "@/entity/Campaign";
import { User } from "@/entity/User";
import { DeleteResult } from "typeorm";

@Resolver()
export class DeleteVoucherResolver {
  private voucherRepo = myDataSource.getRepository(Voucher);

  @Mutation(() => Number)
  async deleteVoucher(@Arg("id") id: string): Promise<Number | null| undefined> {
    const voucher = await this.voucherRepo.delete({
      id,
    });
    return voucher.affected;
  }
}
