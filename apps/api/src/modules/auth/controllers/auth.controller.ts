import { ConfigService } from "@nestjs/config";
import { AuthService } from "../services/auth.service";
import { Controller, Post } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}
}
