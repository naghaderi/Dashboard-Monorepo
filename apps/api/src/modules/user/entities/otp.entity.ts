import { ObjectType, Field, ID } from "@nestjs/graphql";
import { UserEntity } from "./user.entity";

@ObjectType()
export class OtpEntity {
  @Field(() => ID)
  id: string;

  @Field()
  code: string;

  @Field()
  expires_in: Date;

  @Field()
  userId: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
