import { PrismaService } from "../prisma/prisma.service";
import { UserResolver } from "./resolvers/user.resolver";
import { UserService } from "./services/user.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
