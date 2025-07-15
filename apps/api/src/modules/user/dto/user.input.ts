import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { IsString, MinLength } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";
import { Role } from "src/common/enums/role.enum";

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  avatar?: string;

  @Field(() => Role, { defaultValue: Role.STUDENT })
  role: Role;
}
