import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}
}
