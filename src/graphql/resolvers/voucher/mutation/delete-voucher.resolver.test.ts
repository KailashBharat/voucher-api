import { buildSchema } from "type-graphql";
import {  mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema} from "graphql";
import { VouchersResolver } from "../query/vouchers.resolver";
import { DeleteVoucherResolver } from "./delete-voucher.resolver";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [VouchersResolver, DeleteVoucherResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("DeleteVoucherResolver", () => {
  it("should return the count of the deleted records", async () => {
    const query = `mutation DeleteVoucher($id: String!) {
        deleteVoucher(id: $id)
    }`;
    server
      .query(query, {id : "uuid"})
      .then((res) => {
        const data = res?.data?.deleteVoucher as any;
        expect(data).toBe(1);
      })
      .catch((e) => console.error(e));
  });
});
