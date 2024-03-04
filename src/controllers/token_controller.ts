import { Router } from "express"
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as User from "../../services/user";
import * as Jwt from "../..//utils/jwt";

const TokenController = () => {
    const router = Router();

    router.post("/verify", async (req, res) => {
        const { token } = req.body;
        try {
            const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!!) as JwtPayload;
            const user = await User.findUserById(parseInt(payload.userId))
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