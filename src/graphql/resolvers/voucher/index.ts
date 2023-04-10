import { CreateVoucherResolver } from "./mutation/create-voucher.resolver"
import { VoucherResolver } from "./query/voucher.resolver"
import { VouchersResolver } from "./query/vouchers.resolver"

export * from "./dto"

export const VoucherGraphQLResolvers = [
    //  Queries
    VoucherResolver,
    VouchersResolver,
    //  Mutations
    CreateVoucherResolver
]