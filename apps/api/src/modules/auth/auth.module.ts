import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { PrismaService } from "../prisma/prisma.service";
import { AuthResolver } from "./resolvers/auth.resolver";
import { AuthService } from "./services/auth.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configureService: ConfigService) => ({
        secret: configureService.get<string>("ACCESS_TOKEN_SECRET"),
        signOptions: {
          expiresIn: configureService.get<string>("ACCESS_TOKEN_EXPIRES_IN"),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, PrismaService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
