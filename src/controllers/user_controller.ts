import { Request, Response } from "express";
import { Router } from "express";
import * as User from "../../services/user";
import * as Jwt from "../../utils/jwt";
import * as Auth from "../../services/auth";
import bcrypt from "bcryptjs";
import multer from "multer";
import { isStrongPassword } from "../../utils/isStrongPassword";
import * as Cupid from "../../services/cupid"
import * as Notifications from "../../services/notifications";
import { NotificationType } from "@prisma/client";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./Images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })



const UserController = () => {
    const router = Router();
    router.post("/session", async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await User.findUserByEmail(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            const { accessToken, refreshToken } = Jwt.generateTokens(user);
            await Auth.addRefreshTokenToWhitelist({ refreshToken, userId: user.id });
            res.send({ user: user, tokens: { accessToken, refreshToken } });
        } else {
            res.send({ error: "Invalid login credentials." });
        }
    })

    router.post("/create", upload.single('file'), async (req, res) => {
        const { userType, firstName, lastName, email, password, age, budget, goals, bio } = req.body;
        const existingUser = await User.findUserByEmail(email);

        if (existingUser) {
            res.send({ error: "Email already in use" });
            return;
        }
        const passwordIsStrong = isStrongPassword(password);
        if (!passwordIsStrong.success) {
            res.send({ error: passwordIsStrong.message })
            return;
        }

        switch (userType) {
            case 'Standard':
                const user = await User.create({ firstName, lastName, email, password, age, budget, goals })
                if (user) {
                    res.send({ userId: user.id });
                    await Notifications.recordNotification(user.id, "Welcome to CupidCode!", "You have found the path to smoother dating", NotificationType.DAILY)
                }
                break;
            case 'Cupid':
                const cupid = await Cupid.create({ firstName, lastName, email, password, bio })
                if (cupid) {
                    res.send({ userId: cupid.id });
                    await Notifications.recordNotification(cupid.id, "Welcome to CupidCode!", "You have found the path to smoother dating", NotificationType.DAILY)
                }
                break;
            default:
                res.send({ error: "Invalid user type" })
        }
    })

    router.post('/profileUrl', upload.single('file'), async (req, res) => {
        try {
            const user = await User.updateUserPicture(parseInt(req.body.userId), req!!.file!!.path)
        } catch (error) {
            res.send({ error })
            console.log({ error })
        }
    })

    return router;
}





export default UserController;