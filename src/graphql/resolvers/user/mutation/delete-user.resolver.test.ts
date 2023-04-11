import { buildSchema } from "type-graphql";
import {  mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema} from "graphql";
import { UsersResolver } from "../query/users.resolver";
import { DeleteUserResolver } from "./delete-user.resolver";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [DeleteUserResolver, UsersResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("DeleteUserResolver", () => {
  it("should return the count of the deleted records", async () => {
    const query = `mutation DeleteUser($id: String!) {
        deleteUser(id: $id)
    }`;
    server
      .query(query, {id : "uuid"})
      .then((res) => {
        const data = res?.data?.deleteUser as any;
        expect(data).toBe(1);
      })
      .catch((e) => console.error(e));
  });
});
