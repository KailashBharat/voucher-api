import { Resolver, Query, Arg } from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";
import { VoucherDto } from "../dto";

@Resolver()
export class ValidateVoucherResolver {
  private voucherRepo = myDataSource.getRepository(Voucher);

  @Query(() => Boolean, { description: "Validates if a voucher is unused" })
  async validate(@Arg("id") id: string): Promise<Boolean> {
    const voucher = await this.voucherRepo.findOne({
      where: { id },
      relations: ["campaign", "usedBy"],
    });

    if((voucher && voucher.usedBy) || !voucher){
      return false
    }else if(voucher && !voucher.usedBy){
      return true
    }else return false
  }
}
