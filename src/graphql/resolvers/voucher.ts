import { Resolver, Query } from "type-graphql";

@Resolver()
export class VoucherResolver {
  @Query(() => String, { name: "hello", description: "Returns a greeting" })
  async hello() {
    return "Hello world";
  }
}
