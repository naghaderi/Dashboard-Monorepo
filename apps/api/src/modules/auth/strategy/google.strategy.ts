import { Strategy, Profile, StrategyOptions } from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";
import { VerifiedCallback } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "./../services/auth.service";
import { Injectable } from "@nestjs/common";
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    const options: StrategyOptions = {
      clientID: configService.get<string>("GOOGLE_CLIENT_ID")!,
      callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL")!,
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET")!,
      scope: ["email", "profile"],
    };
    super(options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifiedCallback
  ): Promise<any> {
    const email = profile.emails?.[0]?.value ?? "";
    const avatar = profile.photos?.[0]?.value ?? "";
    const name = profile.displayName ?? "";
    const user = await this.authService.validateGoogleUser({
      email,
      name,
      avatar,
      password: "",
      role: Role.STUDENT,
    });

    done(null, user);
  }
}
