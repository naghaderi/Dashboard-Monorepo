import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class OtpResponseEntity {
  @Field()
  message: string;
}
