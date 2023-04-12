import { UsersResolver } from "./users.resolver";
import { buildSchema } from "type-graphql";
import { mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema} from "graphql";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [UsersResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("UsersResolver", () => {
  it("should return a user's name", async () => {
    const query = `
    query {
        users {
          name
        }
      }`;
    server
      .query(query)
      .then((res) => {
        const data: { name: string }[] = res?.data?.users as any;
        expect(data[0].name).toBe("Hello");
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined", async () => {
    const query = `
    query {
        users {
        }
      }`;
    server
      .query(query)
      .then((res) => {
        const data: { name: string }[] = res?.data?.users as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
