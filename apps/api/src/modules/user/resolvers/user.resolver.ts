import { Resolver, Query } from "@nestjs/graphql";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { RolesGuard } from "src/common/guards/roles.guard";
import { AuthGuard } from "src/common/guards/auth.guard";
import { UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decorators/roles.decorator";

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserEntity)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("USER", "ADMIN")
  async me(@CurrentUser() user: UserEntity) {
    return this.userService.findById(user.id);
  }

  @Query(() => [UserEntity])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN")
  async users() {
    return this.userService.findAll();
  }
}
