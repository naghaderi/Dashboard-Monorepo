import { Field, ObjectType } from "@nestjs/graphql";
import { Role } from "src/common/enums/role.enum";

@ObjectType()
export class AuthPayloadEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Role)
  role: Role;

  @Field()
  accessToken: string;
}
