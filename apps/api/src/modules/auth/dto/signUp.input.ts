import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsEmail,
  MinLength,
  ValidateIf,
} from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SignUpInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: "First name is required" })
  @Length(2, 50, { message: "First name must be between 2 and 50 characters" })
  first_name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: "Last name is required" })
  @Length(2, 50, { message: "Last name must be between 2 and 50 characters" })
  last_name: string;

  @Field()
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: "Mobile number is required" })
  @Matches(/^09\d{9}$/, {
    message: "Mobile number must be valid (e.g., 0912...)",
  })
  mobile: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: "Confirm password is required" })
  confirm_password: string;
}
