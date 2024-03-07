import { Router } from "express"
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Jwt from "../utils/jwt";
import { PrismaClient } from "@prisma/client";
import UserRepository from "../repositories/user_repository";

const TokenController = (db: PrismaClient) => {
    const _repository = new UserRepository(db);
    const router = Router();

    router.post("/verify", async (req, res) => {
        const { token } = req.body;
        try {
            const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!!) as JwtPayload;
            const user = await _repository.findById(payload.userId)
            const accessToken = Jwt.generateAccessToken(user);
            res.send({ user, tokens: { refreshToken: token, accessToken } })
        } catch (err) {
            res.send({ error: "Expired" })
            console.log(err)
        }
    })
    return router;
}

export default TokenController;