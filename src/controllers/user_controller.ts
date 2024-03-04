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
import * as Purchases from "../../services/purchases";

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

    // ************** Adding CupidCash in Account ***************
    router.post("/cash", async (req, res) => {
        const { changeAmount, userId } = req.body
        try {
            const user = await User.findUserById(userId);
            const currentBalance = user!!.profile!!.balance.toNumber();
            var workingChangeAmount = Math.abs(changeAmount)
            const newBalance = currentBalance + workingChangeAmount;
            if (newBalance < 0) {
                res.send({ error: "Cannot Spend more money then you have!" })
                return;
            }
            await User.updateUserBalance(userId, newBalance)
            await Purchases.recordPurchase(userId, null, workingChangeAmount, 0, 0, workingChangeAmount, "Cupid Bucks Purchase")
            res.send({ newBalance });
            return;
        } catch (error) {
            console.log({ error })
            res.send({ error: "Access Denied" })
            return;
        }
    });

    // ************** Update User Account ***************
    router.post("/update", async (req, res) => {
        const { userId, firstName, lastName, email, age, dailyBudget, relationshipGoals } = req.body
        var workingAge = parseInt(age)
        var workingBudget = parseFloat(dailyBudget)

        // Validate Numbers
        if (isNaN(workingAge)) {
            res.send({ error: "Age must be a number" })
            return;
        }

        if (isNaN(workingBudget)) {
            res.send({ error: "Budget must be a number" });
            return;
        }

        // Check Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            res.send({ error: "Invalid Email Provided" })
            return;
        }
        // Check Budget
        if (workingBudget < 10 && workingBudget != 0) {
            res.send({ error: "In order to service quality dates, Cupid Code requires a minimum of 10 cupid bucks per date" })
            return;
        }
        // Check Age
        if (workingAge < 18 && workingAge != 0) {
            res.send({ error: "To use this service you must be at least 18" })
            return;
        }
        const updatedAccount = await User.updateUserAccount(userId, firstName, lastName, email, workingAge, workingBudget, relationshipGoals)
        res.send({ message: "Your account was successfully updated", updatedAccount })
        return;
    });

    // ************** Update User Password ***************
    router.post("/password", async (req, res) => {
        const { userId, currentPassword, newPassword, repeatNew } = req.body
        const user = await User.findUserById(userId);

        const resultOfStrongCheck = isStrongPassword(newPassword)
        if (!resultOfStrongCheck.success) {
            res.send({ error: resultOfStrongCheck.message })
            return;
        }

        if (user && bcrypt.compareSync(currentPassword, user.password)) {
            const profile = await User.updateUserPassword(userId, newPassword)
            res.send({ message: "Your account was successfully updated", profile })
            return;
        } else {
            res.send({ error: "Incorrect Current Password." });
            return;
        }
    });

    return router;
}





export default UserController;