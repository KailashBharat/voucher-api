import { buildSchema } from "type-graphql";
import { mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema} from "graphql";
import { CampaignResolver } from "../query/campaign.resolver";
import { DeleteCampaignResolver } from "./delete-campaign.resolver";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [CampaignResolver, DeleteCampaignResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("DeleteCampaignResolver", () => {
  it("should return the count of the deleted records", async () => {
    const query = `mutation DeleteCampaign($id: String!) {
        deleteCampaign(id: $id)
    }`;
    server
      .query(query, {id : "uuid"})
      .then((res) => {
        const data = res?.data?.deleteCampaign as any;
        expect(data).toBe(1);
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `mutation DeleteCampaign($id: String!) {
        deleteCampaign(id: $id)
    }`;
    server
      .query(query)
      .then((res) => {
        const data= res?.data?.deleteCampaign as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });

});
