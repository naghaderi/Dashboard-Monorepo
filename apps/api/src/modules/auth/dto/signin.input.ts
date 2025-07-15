import { IsEmail, IsString, MinLength } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SignInInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}
