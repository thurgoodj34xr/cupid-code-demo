import UserRepository from "../repositories/user_repository";
import Jwt from "../utils/jwt";
import { MiddlewareBuilder } from "./middleware";

const AuthMiddleware: MiddlewareBuilder = (db, roles) => async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const payload = Jwt.verify(authorization!!);
        const user = await new UserRepository(db).findById(payload.userId)
        req.user = user;
        if (roles && !roles.includes(user!!.role)) {
            throw Error("USER DOES NOT HAVE PERMISSIONS")
        }
        console.log("Access Granted")
        next();
    } catch (error) {
        console.error(error)
        res.send({ error })
    }
}

export default AuthMiddleware;