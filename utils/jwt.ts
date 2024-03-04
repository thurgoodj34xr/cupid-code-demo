import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


export function generateAccessToken(user: any) {
    return jwt.sign({ userId: user.id }, `${process.env.JWT_ACCESS_SECRET}`, {
        expiresIn: '1s',
      });
}

export function generateRefreshToken(user: any) {
  return jwt.sign({ userId: user.id }, `${process.env.JWT_ACCESS_SECRET}`, {
    expiresIn: '8h',
  });
  }


export function generateTokens(user: any): { accessToken: string; refreshToken: string; } {
  const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
    
      return {
        accessToken,
        refreshToken,
      };
}

