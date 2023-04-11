import { VouchersResolver } from "./vouchers.resolver";
import { buildSchema } from "type-graphql";
import { mockServer, IMockServer } from "@graphql-tools/mock";
import { GraphQLSchema} from "graphql";

let schema: GraphQLSchema;
let server: IMockServer;

beforeAll(async () => {
  schema = await buildSchema({
    resolvers: [VouchersResolver],
  });
  const mocks = {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "Hello",
    DateTime: () => new Date(),
  };
  server = mockServer(schema, mocks);
});

describe("VouchersResolver", () => {
  it("should return a voucher's name", async () => {
    const query = `
    query {
        vouchers {
          name
        }
      }`;
    server
      .query(query)
      .then((res) => {
        const data: { name: string }[] = res?.data?.vouchers as any;
        expect(data[0].name).toBe("Hello");
      })
      .catch((e) => console.error(e));
  });

  it("should return undefined", async () => {
    const query = `
    query {
        vouchers {
        }
      }`;
    server
      .query(query)
      .then((res) => {
        const data: { name: string }[] = res?.data?.vouchers as any;
        expect(data).toBeUndefined();
      })
      .catch((e) => console.error(e));
  });
});
