import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default class Jwt {

  static generateAccessToken(user: any) {
    return jwt.sign({ userId: user.id }, `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: '10m',
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
}

