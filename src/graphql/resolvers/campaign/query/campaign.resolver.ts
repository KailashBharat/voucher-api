import { Campaign } from "../../../../entity/Campaign";
import { Repository } from "typeorm";

export async function getCampaign(
  name: string,
  repo: Repository<Campaign>
): Promise<Campaign | null> {
  return await repo.findOne({ where: { name } });
}
