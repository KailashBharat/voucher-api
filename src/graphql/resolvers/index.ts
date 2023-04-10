import { CampaignGraphQLServices } from "./campaign";
import { VoucherGraphQLResolvers } from "./voucher";
import { UserGraphQLResolvers } from "./user";

export const GraphQLResolvers = [
  ...CampaignGraphQLServices,
  ...VoucherGraphQLResolvers,
  ...UserGraphQLResolvers,
] as const;
