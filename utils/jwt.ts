import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


export function generateAccessToken(user: any) {
    return jwt.sign({ userId: user.id }, `${process.env.JWT_ACCESS_SECRET}`, {
        expiresIn: '10s',
      });
}

export function generateRefreshToken(user: any, jti: any) {
    return jwt.sign({
      userId: user.id,
      jti
    }, `${process.env.JWT_REFRESH_SECRET}`, {
      expiresIn: '8h',
    });
  }


export function generateTokens(user: any, jti: string): { accessToken: string; refreshToken: string; } {
  const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user, jti);
    
      return {
        accessToken,
        refreshToken,
      };
}

