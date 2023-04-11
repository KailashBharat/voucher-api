import "reflect-metadata"
import { CreateUserResolver } from "./create-user.resolver";
import { buildSchema } from "type-graphql";
import { addMocksToSchema, mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema, graphql } from "graphql";
import { UsersResolver } from "../query/users.resolver";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [UsersResolver, CreateUserResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("CreateUserResolver", () => {
  it("should return the name of the created user", async () => {
    const query = `mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
          name
        }
      }`;
    server
      .query(query, {
        input: {
          name: "Hello",
          isAdmin: false,
          email: "email",
          age: 21,
        },
      })
      .then((res) => {
        const data: { name: string } = res?.data?.createUser as any;
        expect(data.name).toBe("Hello");
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
          name
        }
      }`;
    server
      .query(query)
      .then((res) => {
        const data = res?.data?.createUser as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no values are added to the query", async () => {
    const query = `mutation CreateUser($input: UserInput!) {
        createUser(input: $input) {
        }
      }`;
    server
      .query(query, {
        input: {
          name: "Hello",
          isAdmin: false,
          email: "email",
          age: 21,
        },
      })
      .then((res) => {
        const data = res?.data?.createUser as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
