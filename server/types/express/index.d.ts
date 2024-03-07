import { PrismaClient, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        export interface Request {
            user?: User | null,
            jwt?: JwtPayload,
        }
    }
}