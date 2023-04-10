import { CreateUserResolver } from "./mutation/create-user.resolver";
import { UserResolver } from "./query/user.resolver";

export * from "./dto";

export const UserGraphQLResolvers = [
  //  Queries
  UserResolver,
  //  Mutations
  CreateUserResolver,
];
