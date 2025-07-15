import { ConfigModule, ConfigService } from "@nestjs/config";
import { GoogleStrategy } from "./strategy/google.strategy";
import { AuthController } from "./controllers/auth.controller";
import { PrismaService } from "../prisma/prisma.service";
import { AuthResolver } from "./resolvers/auth.resolver";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthService } from "./services/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configureService: ConfigService) => ({
        secret: configureService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configureService.get<string>("JWT_EXPIRES_IN"),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AuthResolver,
    PrismaService,
    GoogleStrategy,
  ],
})
export class AuthModule {}
