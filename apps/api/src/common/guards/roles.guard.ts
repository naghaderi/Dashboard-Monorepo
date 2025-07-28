import { ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Injectable, CanActivate } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<string[]>("roles", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user || !requiredRoles.includes(user.role))
      throw new ForbiddenException("You do not have permission");
    return true;
  }
}
