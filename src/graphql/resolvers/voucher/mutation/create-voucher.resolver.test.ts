import "reflect-metadata"
import { CreateVoucherResolver } from "./create-voucher.resolver";
import { buildSchema } from "type-graphql";
import {  mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema} from "graphql";
import { VouchersResolver } from "../query/vouchers.resolver";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [VouchersResolver, CreateVoucherResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("CreateVoucherResolver", () => {
  it("should return the name of the created voucher", async () => {
    const query = `mutation CreateVoucher($input: VoucherInput!) {
        createVoucher(input: $input) {
          name
        }
      }`;
    server
      .query(query, {
        input: {
          name: "Hello",
          description: "Voucher description",
          campaignId: "uuid"
        },
      })
      .then((res) => {
        const data: { name: string } = res?.data?.createVoucher as any;
        expect(data.name).toBe("Hello");
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `mutation CreateVoucher($input: VoucherInput!) {
        createVoucher(input: $input) {
          name
        }
      }`;
    server
      .query(query)
      .then((res) => {
        const data = res?.data?.createVoucher as any;
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
            description: "Voucher description",
            campaignId: "uuid"
          },
      })
      .then((res) => {
        const data = res?.data?.createVoucher as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
