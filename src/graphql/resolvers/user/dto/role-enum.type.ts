import { registerEnumType } from "type-graphql";

export enum ROLE {
  USER,
  ADMIN,
}

registerEnumType(ROLE, {
  name: "ROLE",
});
