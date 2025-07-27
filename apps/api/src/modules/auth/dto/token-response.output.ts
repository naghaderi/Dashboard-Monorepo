import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class TokenResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  message: string;
}
