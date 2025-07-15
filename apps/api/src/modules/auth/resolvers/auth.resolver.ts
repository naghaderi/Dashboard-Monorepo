import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthPayloadEntity } from "../entities/auth-entity";
import { AuthService } from "../services/auth.service";
import { SignInInput } from "../dto/signin.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayloadEntity)
  async signIn(@Args("signInInput") signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput);
    return await this.authService.login(user);
  }
}
