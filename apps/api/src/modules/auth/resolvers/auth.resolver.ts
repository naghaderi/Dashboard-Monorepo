import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { SendOtpInput, CheckOtpInput } from "../dto/otp.input";
import { OtpResponseEntity } from "src/modules/user/entities/otp-response.output";
import { TokenResponse } from "../dto/token-response.output";
import { SignUpInput } from "../dto/signUp.input";
import { AuthService } from "../services/auth.service";
import { LoginInput } from "../dto/signIn.input";
import { Public } from "src/common/decorators/public.decorator";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  ping(): string {
    return "pong";
  }

  @Mutation(() => OtpResponseEntity)
  @Public()
  async sendOtp(@Args("input") otpDto: SendOtpInput) {
    return this.authService.sendOtp(otpDto);
  }

  @Mutation(() => TokenResponse)
  @Public()
  async checkOtp(@Args("input") checkOtp: CheckOtpInput) {
    return this.authService.checkOtp(checkOtp);
  }

  @Mutation(() => TokenResponse)
  @Public()
  async signUp(@Args("input") signUp: SignUpInput) {
    return this.authService.signUp(signUp);
  }

  @Mutation(() => TokenResponse)
  @Public()
  async signIn(@Args("input") login: LoginInput) {
    return this.authService.signIn(login);
  }
}
