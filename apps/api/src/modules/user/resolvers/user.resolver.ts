import { UserService } from "../services/user.service";
import { UserEntity } from "../entities/user.entity";
import { Resolver } from "@nestjs/graphql";

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
