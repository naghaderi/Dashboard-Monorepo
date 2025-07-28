import { PrismaModule } from "../prisma/prisma.module";
import { UserResolver } from "./resolvers/user.resolver";
import { UserService } from "./services/user.service";
import { AuthModule } from "../auth/auth.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
