import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}
