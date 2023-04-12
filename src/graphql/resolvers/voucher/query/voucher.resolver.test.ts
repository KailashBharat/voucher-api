import { VoucherResolver } from "./voucher.resolver";
import { buildSchema } from "type-graphql";
import {  mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema} from "graphql";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [VoucherResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("VoucherResolver", () => {
  it("should return a voucher's name", async () => {
    const query = `
    query ($id: String!) {
        voucherById(id: $id) {
          name
        }
      }`;
    server
      .query(query, { id: "Hello" })
      .then((res) => {
        const data: { name: string } = res?.data?.voucherById as any;
        expect(data.name).toBe("Hello");
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `
    query ($name: String!) {
        voucherById(name: $name) {
          name
        }
      }`;
    server
      .query(query)
      .then((res) => {
        const data: { name: string } = res?.data?.voucherById as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined", async () => {
    const query = `
    query ($id: String!) {
        voucherById(id: $id) {
        }
      }`;
    server
      .query(query, { id: "Hello" })
      .then((res) => {
        const data: { name: string } = res?.data?.voucherById as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
