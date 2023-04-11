import { CreateCampaignResolver } from "./mutation/create-campaign.resolver";
import { DeleteCampaignResolver } from "./mutation/delete-campaign.resolver";
import { UpdateCampaignResolver } from "./mutation/update-campaign.resolver";
import { CampaignResolver } from "./query/campaign.resolver";
import { CampaignsResolver } from "./query/campaigns.resolver";

export * from "./dto";

export const CampaignGraphQLServices = [
  //    Queries
  CampaignResolver,
  CampaignsResolver,
  //    Mutations    
  CreateCampaignResolver,
  UpdateCampaignResolver,
  DeleteCampaignResolver
];
