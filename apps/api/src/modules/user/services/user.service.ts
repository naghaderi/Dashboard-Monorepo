import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }
}
