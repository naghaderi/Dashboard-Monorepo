import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SendOtpInput, CheckOtpInput } from "../dto/auth.input";
import { addMinutes, isBefore } from "date-fns";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {}

  async createOtpForUser(userId: string, mobile: string) {
    const now = new Date();
    const existingOtp = await this.prisma.otp.findFirst({
      where: {
        userId,
        expires_in: {
          gt: now,
        },
      },
    });
    if (existingOtp) {
      throw new UnauthorizedException(
        "An OTP was already sent recently. Please wait until it expires."
      );
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(new Date().getTime() + 2 * 60 * 1000);
    const otp = await this.prisma.otp.create({
      data: {
        code,
        expires_in: expires,
        userId,
      },
    });
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        otp: {
          connect: { id: otp.id },
        },
      },
    });
    console.log(`[OTP] Code for ${mobile}: ${code}`);
    return otp;
  }

  async sendOtp({ mobile }: SendOtpInput) {
    let user = await this.prisma.user.findUnique({ where: { mobile } });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          mobile,
          first_name: "Unregistered",
          last_name: "User",
        },
      });
    }
    await this.createOtpForUser(user.id, mobile);
    return { message: "OTP sent successfully." };
  }

  async checkOtp({ mobile, code }: CheckOtpInput) {
    const user = await this.prisma.user.findUnique({
      where: { mobile },
      include: { otp: true },
    });
    if (!user?.otp)
      throw new UnauthorizedException("Invalid mobile number or code.");
    if (user.otp.code !== code)
      throw new UnauthorizedException("Incorrect code.");
    if (isBefore(user.otp.expires_in, new Date()))
      throw new UnauthorizedException("Code has expired.");
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        mobile_verify: true,
        otp: { disconnect: true },
      },
    });

    const token = await this.jwt.signAsync(
      { sub: user.id, mobile: user.mobile },
      {
        secret: this.config.get("JWT_SECRET"),
        expiresIn: this.config.get("JWT_EXPIRES_IN"),
      }
    );

    return { access_token: token };
  }
}
