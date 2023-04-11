import { buildSchema } from "type-graphql";
import { mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema } from "graphql";
import { UsersResolver } from "../query/users.resolver";
import { UpdateUserResolver } from "./update-user.resolver";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [UpdateUserResolver, UsersResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("UpdateUserResolver", () => {
  it("should return the count of the deleted records", async () => {
    const query = `mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input)
    }`;
    server
      .query(query, {
        input: {
          id: "uuid",
          name: "updated name",
          email: "updated email",
        },
      })
      .then((res) => {
        const data = res?.data?.updateUser as any;
        expect(data).toBe(1);
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input)
    }`;
    server
      .query(query)
      .then((res) => {
        const data = res?.data?.updateUser as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
