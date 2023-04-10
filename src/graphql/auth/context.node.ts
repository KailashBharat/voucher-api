import { User } from "@/entity/User";

export interface Context {
  user?: Pick<User, "id" | "role" | "name">;
}


