import { IsNotEmpty, IsString, Length, Matches } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SendOtpInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^09\d{9}$/, {
    message: "شماره موبایل باید معتبر باشد (مثل 0912...)",
  })
  mobile: string;
}

@InputType()
export class CheckOtpInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/^09\d{9}$/, {
    message: "شماره موبایل باید معتبر باشد (مثل 0912...)",
  })
  mobile: string;

  @Field()
  @IsString()
  @Length(4, 6, { message: "کد باید بین 4 تا 6 رقم باشد" })
  code: string;
}
