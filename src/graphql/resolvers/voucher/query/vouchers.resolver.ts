import { Resolver, Query} from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";
import { VoucherDto } from "../dto";

@Resolver()
export class VouchersResolver {
  private voucherRepo = myDataSource.getRepository(Voucher);

  @Query(() => [VoucherDto])
  async vouchers(): Promise<VoucherDto[]> {
    const vouchers = await this.voucherRepo.find();
    return vouchers;
  }
}
