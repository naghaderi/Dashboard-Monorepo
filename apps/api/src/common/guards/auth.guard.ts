import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthService } from "src/modules/auth/services/auth.service";
import { isJWT } from "class-validator";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const authHeader = req.headers?.authorization;
    if (!authHeader)
      throw new UnauthorizedException("Authorization header missing");
    const [bearer, token] = authHeader.split(" ");
    if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token))
      throw new UnauthorizedException("Invalid or missing token");
    const user = await this.authService.verifyAccessToken(token);
    if (!user?.mobile_verify)
      throw new UnauthorizedException("Mobile number not verified");
    req.user = {
      id: user.id,
      mobile: user.mobile,
      role: user.role,
    };
    return true;
  }
}
