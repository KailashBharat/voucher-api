import { buildSchema } from "type-graphql";
import { mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema } from "graphql";
import { VouchersResolver } from "../query/vouchers.resolver";
import { UpdateVoucherResolver} from "./update-voucher.resolver";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [UpdateVoucherResolver, VouchersResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("UpdateVoucherResolver", () => {
  it("should return the count of the updated records", async () => {
    const query = `mutation UpdateVoucher($input: UpdateVoucherInput!) {
        updateVoucher(input: $input)
    }`;
    server
      .query(query, {
        input: {
          id: "uuid",
          name: "updated name",
          description: "updated description",
        },
      })
      .then((res) => {
        const data = res?.data?.updateVoucher as any;
        expect(data).toBe(1);
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined if no arguments are passed", async () => {
    const query = `mutation UpdateVoucher($input: UpdateVoucherInput!) {
        updateVoucher(input: $input)
    }`;
    server
      .query(query)
      .then((res) => {
        const data = res?.data?.updateVoucher as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
