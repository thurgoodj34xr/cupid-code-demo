import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default class Jwt {

  static generateAccessToken(user: any) {
    return jwt.sign({ userId: user.id }, `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: '3h',
    });
  }

  static generateRefreshToken(user: any) {
    return jwt.sign({ userId: user.id }, `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: '8h',
    });
  }


  static generateTokens(user: any): { accessToken: string; refreshToken: string; } {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  static verify(token: string) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!!) as JwtPayload
  }
}

