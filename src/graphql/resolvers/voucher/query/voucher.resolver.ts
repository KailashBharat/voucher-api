import { Resolver, Query, Arg} from "type-graphql";
import { myDataSource } from "@/app-data-source";
import { Voucher } from "@/entity/Voucher";
import { VoucherDto } from "../dto";

@Resolver()
export class VoucherResolver {
  private voucherRepo = myDataSource.getRepository(Voucher);

  @Query(() => VoucherDto, { description: "Gets a voucher by id" })
  async voucherById(@Arg("id") id: string): Promise<VoucherDto | null> {
    const voucher = await this.voucherRepo.findOne({ where: { id: id }, relations: ["campaign", "usedBy"] });
    return voucher;
  }
}
