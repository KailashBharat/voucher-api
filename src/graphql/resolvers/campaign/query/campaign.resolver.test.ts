import { CampaignResolver } from "./campaign.resolver";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { myDataSource } from "@/app-data-source";

let schema: any;
let server: any;

beforeAll(async () => {
  await myDataSource.initialize();
  schema = await buildSchema({
    resolvers: [CampaignResolver],
  });
  server = new ApolloServer({ schema });
});

describe("CampaignResolver", () => {
  it("should run", async () => {
    const res = await server.executeOperation({
      query: "query ($name: String) {campaign(name: $name)}",
      variables: { name: "SRC" },
    });
  });
});
