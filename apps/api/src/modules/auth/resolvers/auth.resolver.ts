import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { SendOtpInput, CheckOtpInput } from "../dto/auth.input";
import { OtpResponseEntity } from "src/modules/user/entities/otp-response.output";
import { TokenResponse } from "../dto/token-response.output";
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  ping(): string {
    return "pong";
  }
  @Mutation(() => OtpResponseEntity)
  async sendOtp(@Args("input") otpDto: SendOtpInput) {
    return this.authService.sendOtp(otpDto);
  }

  // AuthResolver.ts
  @Mutation(() => TokenResponse)
  async checkOtp(@Args("input") checkOtp: CheckOtpInput) {
    return this.authService.checkOtp(checkOtp);
  }
}
