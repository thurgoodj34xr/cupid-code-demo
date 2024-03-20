import UserRepository from "../repositories/user_repository";
import Jwt from "../utils/jwt";
import Logger from "../utils/logger";
import { MiddlewareBuilder } from "./middleware";

const AuthMiddleware: MiddlewareBuilder = (db, roles) => async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const payload = Jwt.verify(authorization!!);
        const user = await new UserRepository(db).findById(payload.userId)
        req.user = user;
        if (roles && !roles.includes(user!!.role)) {
            logError("authentication.ts", `User does not have the correct role to access ${req.url}`, user!!)
        } else {
            //logInfo("authentication.ts", `${user?.email} ${req.url}`)
            next();
        }
    } catch (error) {
        logError("authentications.ts", error)
        res.send({ error })
}
}

export default AuthMiddleware;