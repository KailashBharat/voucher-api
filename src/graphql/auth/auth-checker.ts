import { Context } from "./context.node";
import { AuthChecker } from "type-graphql";

export const authChecker: AuthChecker<Context> = (
  { args, context, info, root },
  roles: string[]
) => {
  const { user } = context;
  if (user && roles.includes(user?.role)) {
    return true;
  } else return false;
};
