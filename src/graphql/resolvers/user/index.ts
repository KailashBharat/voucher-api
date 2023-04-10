import { CreateUserResolver } from "./mutation/create-user.resolver";
import { UserResolver } from "./query/user.resolver";
import { UsersResolver } from "./query/users.resolver";

export * from "./dto";

export const UserGraphQLResolvers = [
  //  Queries
  UserResolver,
  UsersResolver,
  //  Mutations
  CreateUserResolver,
];
