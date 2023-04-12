import { Resolver,  Mutation, Arg } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";

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
