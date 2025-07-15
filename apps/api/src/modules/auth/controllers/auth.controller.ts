import { Controller, Get, Request, Res, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "src/common/guards/google-auth.guard";
import { ConfigService } from "@nestjs/config";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { AuthService } from "../services/auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleCallback(@Request() req, @Res() res: Response) {
    const userData = await this.authService.login(req.user);
    const redirectBaseUrl = this.configService.get<string>(
      "GOOGLE_REDIRECT_URL"
    );
    const redirectUrl =
      `${redirectBaseUrl}?` +
      new URLSearchParams({
        userId: String(userData.id),
        name: userData.name ?? "",
        avatar: userData.avatar ?? "",
        accessToken: userData.accessToken,
      }).toString();
    res.redirect(redirectUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Get("verify-token")
  verify() {
    return "ok";
  }
}
