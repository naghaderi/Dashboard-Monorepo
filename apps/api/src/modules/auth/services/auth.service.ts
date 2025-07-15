import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserInput } from "src/modules/user/dto/user.input";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { AuthJwtPayload } from "src/common/types/auth-jwtPayload";
import { SignInInput } from "../dto/signin.input";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";
import { User } from "@prisma/client";
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password)
      throw new UnauthorizedException("Invalid credentials");
    const match = await verify(user.password, password);
    if (!match) throw new UnauthorizedException("Invalid credentials");
    return user;
  }

  async generateToken(user: User) {
    const payload: AuthJwtPayload = { sub: user.id, role: user.role };
    const accessToken = await this.jwt.signAsync(payload);
    return { accessToken };
  }

  async login(user: User) {
    const { accessToken } = await this.generateToken(user);
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      accessToken,
    };
  }

  async validateJwtUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException("Invalid token");
    return user;
  }

  async validateGoogleUser(userInput: CreateUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: userInput.email },
    });
    if (user) return user;
    return await this.prisma.user.create({
      data: {
        ...userInput,
        password: "",
        role: Role.STUDENT,
      },
    });
  }
}
