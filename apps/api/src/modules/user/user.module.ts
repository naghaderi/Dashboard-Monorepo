import { PrismaModule } from "../prisma/prisma.module";
import { UserResolver } from "./resolvers/user.resolver";
import { UserService } from "./services/user.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
