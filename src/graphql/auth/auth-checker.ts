import { Context } from "./context.node";
import { AuthChecker } from "type-graphql";
import { ROLE } from "../resolvers/user/dto/role-enum.type";

export const authChecker: AuthChecker<Context> = (
  { args, context, info, root },
  roles: string[]
) => {
  return true;
};
