import { CampaignsResolver } from "./campaigns.resolver";
import { buildSchema } from "type-graphql";
import { addMocksToSchema, mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema, graphql } from "graphql";

let schema: GraphQLSchema;
let server: IMockServer;

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
  server = mockServer(schema, mocks);
});

describe("CampaignsResolver", () => {
  it("should return a list of users' names", async () => {
    const query = `
    query {
      campaigns {
        name
      }
    }`;
    server.query(query).then((res) => {
      const data: { name: string }[] = res?.data?.campaigns as any;
      expect(data[0].name).toBe("Hello");
    });
  });

  it("should return undefined", async () => {
    const query = `
    query {
      campaigns {
      }
    }`;
    server
      .query(query)
      .then((res) => {
        const data: { name: string }[] = res?.data?.campaigns as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
