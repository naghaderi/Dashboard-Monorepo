import { ObjectType, Field, ID } from "@nestjs/graphql";
import { OtpEntity } from "./otp.entity";

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  id: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  mobile: string;

  @Field()
  mobile_verify: boolean;

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
