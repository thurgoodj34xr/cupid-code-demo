import jwt, { JwtPayload } from "jsonwebtoken";
import UserRepository from "../repositories/user_repository";
import { MiddlewareBuilder } from "./middleware";

const AuthMiddleware: MiddlewareBuilder = (db, roles) => async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const payload = jwt.verify(authorization!!, process.env.JWT_ACCESS_SECRET!!) as JwtPayload;
        const user = await new UserRepository(db).findById(payload.userId)
        req.user = user;
        if (roles && !roles.includes(user!!.role)) {
            throw Error("USER DOESNT HAVE PERMISSIONS")
        }
        console.log("Access Granted")
        next();
    } catch (error) {
        console.error(error)
        res.send({ error })
    }
}

export default AuthMiddleware;