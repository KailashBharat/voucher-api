import { CreateVoucherResolver } from "./mutation/create-voucher.resolver"
import { DeleteVoucherResolver } from "./mutation/delete-voucher.resolver"
import { UpdateVoucherResolver } from "./mutation/update-voucher.resolver"
import { VoucherResolver } from "./query/voucher.resolver"
import { VouchersResolver } from "./query/vouchers.resolver"
import { ValidateVoucherResolver } from "./query/validate-voucher.resolver"

export * from "./dto"

export const VoucherGraphQLResolvers = [
    //  Queries
    VoucherResolver,
    VouchersResolver,
    ValidateVoucherResolver,
    //  Mutations
    CreateVoucherResolver,
    DeleteVoucherResolver,
    UpdateVoucherResolver
]