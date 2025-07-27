import { Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "../services/auth.service";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => String)
  testAuth(): string {
    return "Auth resolver is working";
  }
}
