import { ObjectType, Field, ID, registerEnumType } from "@nestjs/graphql";
import { OtpEntity } from "./otp.entity";
import { Role } from "@prisma/client";

registerEnumType(Role, {
  name: "Role",
});

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  mobile: string;

  @Field()
  mobile_verify: boolean;

  @Field(() => Role)
  role: Role;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field({ nullable: true })
  otpId?: string;

  @Field(() => OtpEntity, { nullable: true })
  otp?: OtpEntity;

  @Field(() => [OtpEntity], { nullable: true })
  otps?: OtpEntity[];
}
