import { IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SendOtpInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^09\d{9}$/, {
    message: "Mobile number must be valid (e.g. 0912...)",
  })
  mobile: string;
}

@InputType()
export class CheckOtpInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^09\d{9}$/, {
    message: "Mobile number must be valid (e.g. 0912...)",
  })
  mobile: string;

  @Field()
  @IsString()
  @Length(4, 6, {
    message: "Code must be between 4 and 6 digits",
  })
  code: string;
}
