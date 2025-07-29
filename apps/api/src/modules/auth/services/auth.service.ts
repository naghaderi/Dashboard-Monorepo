import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SendOtpInput, CheckOtpInput } from "../dto/otp.input";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { SignUpInput } from "../dto/signUp.input";
import { JwtService } from "@nestjs/jwt";
import { LoginInput } from "../dto/signIn.input";
import { isBefore } from "date-fns";
import { Role } from "@prisma/client";

import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(signUp: SignUpInput) {
    const { email, password, confirm_password, mobile, first_name, last_name } =
      signUp;
    if (password !== confirm_password)
      throw new UnauthorizedException("Passwords do not match");
    const [emailExists, mobileExists] = await Promise.all([
      this.checkEmailExists(email),
      this.checkMobileExists(mobile),
    ]);
    if (emailExists)
      throw new UnauthorizedException("Email is already registered");
    if (mobileExists)
      throw new UnauthorizedException("Mobile number is already registered");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email,
        mobile,
        last_name,
        first_name,
        role: "USER",
        mobile_verify: false,
        password: hashedPassword,
      },
    });
    return {
      message: "Registration successful",
    };
  }

  async signIn(input: LoginInput) {
    const { email, password } = input;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user || !user.password)
      throw new UnauthorizedException("Invalid credentials");
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException("Invalid credentials");
    const tokens = await this.generateTokens({
      id: user.id,
      mobile: user.mobile,
      role: user.role,
    });
    return {
      ...tokens,
      message: "Login successful",
    };
  }

  async createOtpForUser(userId: string, mobile: string) {
    const now = new Date();
    const existingOtp = await this.prismaService.otp.findFirst({
      where: {
        userId,
      },
      orderBy: { expires_in: "desc" },
    });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(now.getTime() + 2 * 60 * 1000);
    let otp;
    if (existingOtp) {
      otp = await this.prismaService.otp.update({
        where: { id: existingOtp.id },
        data: {
          code,
          expires_in: expires,
        },
      });
    } else {
      otp = await this.prismaService.otp.create({
        data: {
          code,
          expires_in: expires,
          userId,
        },
      });
    }
    await this.prismaService.user.update({
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
    let user = await this.prismaService.user.findUnique({ where: { mobile } });
    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          mobile,
          first_name: "Unregistered",
          last_name: "User",
          role: "USER",
        },
      });
    }
    await this.createOtpForUser(user.id, mobile);
    return { message: "OTP sent successfully." };
  }

  async generateTokens(payload: { id: string; mobile: string; role: Role }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
      expiresIn: this.configService.get<string>("ACCESS_TOKEN_EXPIRES_IN"),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get<string>("REFRESH_TOKEN_EXPIRES_IN"),
    });
    return { accessToken, refreshToken };
  }

  async checkOtp(otpDto: CheckOtpInput) {
    const { mobile, code } = otpDto;
    const user = await this.prismaService.user.findUnique({
      where: { mobile },
      include: { otp: true },
    });
    if (!user?.otp)
      throw new UnauthorizedException("Invalid mobile number or code.");
    if (user.otp.code !== code)
      throw new UnauthorizedException("Incorrect code.");
    if (isBefore(user.otp.expires_in, new Date()))
      throw new UnauthorizedException("Code has expired.");
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        mobile_verify: true,
        otp: { disconnect: true },
      },
    });
    const tokens = await this.generateTokens({
      id: user.id,
      mobile: user.mobile,
      role: user.role,
    });
    return {
      ...tokens,
      message: "OTP verified successfully.",
    };
  }

  async verifyAccessToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
      });
      if (!payload || typeof payload !== "object" || !payload.id)
        throw new UnauthorizedException("Invalid token payload");
      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          mobile: true,
          mobile_verify: true,
          role: true,
          created_at: true,
          updated_at: true,
        },
      });
      if (!user) throw new UnauthorizedException("User not found");
      return user;
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  async checkEmailExists(email: string) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true },
    });
    return !!existingUser;
  }

  async checkMobileExists(mobile: string) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { mobile },
      select: { id: true },
    });
    return !!existingUser;
  }
}
