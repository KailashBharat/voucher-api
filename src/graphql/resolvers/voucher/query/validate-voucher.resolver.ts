import { Resolver, Query, Arg } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";

@Resolver()
export class ValidateVoucherResolver {
  private voucherRepo = myDataSource.getRepository(Voucher);

  @Query(() => Boolean, { description: "Validates if a voucher is unused" })
  async isValid(@Arg("id") id: string): Promise<Boolean> {
    const voucher = await this.voucherRepo.findOne({
      where: { id },
      relations: ["campaign", "usedBy"],
    });

    if ((voucher && voucher.userId) || !voucher) {
      return false;
    } else if (voucher && !voucher.userId) {
      return true;
    } else return false;
  }
}
