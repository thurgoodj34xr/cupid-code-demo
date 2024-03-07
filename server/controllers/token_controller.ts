import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserRepository from "../repositories/user_repository";
import Jwt from "../utils/jwt";

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
            logInfo("token_controller", "created a access token", user?.email)
        } catch (error) {
            logError("token_controller", error)
            res.send({ error: "Expired" })
        }
    })
    return router;
}

export default TokenController;