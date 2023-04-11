import { CreateUserResolver } from "./mutation/create-user.resolver";
import { DeleteUserResolver } from "./mutation/delete-user.resolver";
import { UpdateUserResolver } from "./mutation/update-user.resolver";
import { UserResolver } from "./query/user.resolver";
import { UsersResolver } from "./query/users.resolver";

export * from "./dto";

export const UserGraphQLResolvers = [
  //  Queries
  UserResolver,
  UsersResolver,
  //  Mutations
  CreateUserResolver,
  UpdateUserResolver,
  DeleteUserResolver
];
