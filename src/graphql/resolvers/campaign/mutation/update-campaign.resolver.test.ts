import { buildSchema } from "type-graphql";
import { addMocksToSchema, mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema } from "graphql";
import { CampaignResolver } from "../query/campaign.resolver";
import { UpdateCampaignResolver } from "./update-campaign.resolver";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [CampaignResolver, UpdateCampaignResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("UpdateCampaignResolver", () => {
  it("should return the count of the updated records", async () => {
    const query = `mutation UpdateCampaign($input: UpdateCampaignInput!) {
        updateCampaign(input: $input)
    }`;
    server
      .query(query, {
        input: {
            "description": "updated description",
            "id": "uuid",          }
      })
      .then((res) => {
        const data = res?.data?.updateCampaign as any;
        expect(data).toBe(1);
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `mutation UpdateCampaign($input: UpdateCampaignInput!) {
        updateCampaign(input: $input)
    }`;
    server
      .query(query)
      .then((res) => {
        const data= res?.data?.updateCampaign as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });

});
