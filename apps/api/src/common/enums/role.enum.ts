import { registerEnumType } from "@nestjs/graphql";

export enum Role {
  STUDENT = "STUDENT",
  CREATOR = "CREATOR",
  ADMIN = "ADMIN",
}

registerEnumType(Role, {
  name: "Role",
  description: "User role",
});
