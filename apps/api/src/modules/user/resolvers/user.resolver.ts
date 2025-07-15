import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { CreateUserInput } from "../dto/user.input";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  healthCheck(): string {
    return "GraphQL API is up and running!";
  }
  @Mutation(() => User)
  async createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }
}
