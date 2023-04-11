import { CreateCampaignResolver } from "./create-campaign.resolver";
import { buildSchema } from "type-graphql";
import { addMocksToSchema, mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema, graphql } from "graphql";
import { CampaignResolver } from "../query/campaign.resolver";

let schema: GraphQLSchema;
let server: IMockServer;
let schemaWithMocks: any;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [CampaignResolver, CreateCampaignResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  schemaWithMocks = addMocksToSchema({ schema, mocks });
  server = mockServer(schema, mocks);
});

describe("CreateCampaignResolver", () => {
  it("should return the name of the created campaign", async () => {
    const query = `mutation CreateCampaign($input: CampaignInput!) {
        createCampaign(input: $input) {
            name
        }
    }`;
    server
      .query(query, {
        input: {
          name: "Hello",
          description: "Description",
          userId: "uuid",
          endsAt: new Date().toDateString(),
        },
      })
      .then((res) => {
        const data: { name: string } = res?.data?.createCampaign as any;
        expect(data.name).toBe("Hello");
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `mutation CreateCampaign($input: CampaignInput!) {
        createCampaign(input: $input) {
            name
        }
    }`;
    server
      .query(query)
      .then((res) => {
        const data= res?.data?.createCampaign as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no values are added to the query", async () => {
    const query = `mutation CreateCampaign($input: CampaignInput!) {
        createCampaign(input: $input) {
        }
    }`;
    server
      .query(query, {
        input: {
          name: "Hello",
          description: "Description",
          userId: "uuid",
          endsAt: new Date().toDateString(),
        },
      })
      .then((res) => {
        const data= res?.data?.createCampaign as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
