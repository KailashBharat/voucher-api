import { ValidateVoucherResolver } from "./validate-voucher.resolver";
import { buildSchema } from "type-graphql";
import { addMocksToSchema, mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema, graphql } from "graphql";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [ValidateVoucherResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "Hello",
    Boolean: ()=> true,
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("ValidateVoucherResolver", () => {
  it("should validate whether the voucher is in used or not", async () => {
    const query = `
    query ($id: String!) {
        validate(id: $id)
      }`;
    server
      .query(query, { id: "uuid" })
      .then((res) => {
        const data = res?.data?.validate as any;
        expect(data).toBe(true);
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `
    query ($id: String!) {
        validate(id: $id)
      }`;
    server
      .query(query)
      .then((res) => {
        const data= res?.data?.voucherById as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
