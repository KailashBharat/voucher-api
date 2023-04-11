import { CampaignsResolver } from "./campaigns.resolver";
import { buildSchema } from "type-graphql";
import { addMocksToSchema, mockServer } from "@graphql-tools/mock";
import { GraphQLSchema, graphql } from "graphql";

let schema: GraphQLSchema;
let server: any;
let schemaWithMocks: any;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [CampaignsResolver],
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

describe("CampaignResolver", () => {
  it("should return a list of users' names", async () => {
    const query = `
    query {
      campaigns {
        name
      }
    }`;
    graphql({ schema: schemaWithMocks, source: query })
      .then((res) => {
        const data: { name: string }[] = res?.data?.campaigns as any;
        expect(data[0].name).toBe("Hello");
      })
      .catch((e) => console.error(e));
  });
});
