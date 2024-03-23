import { Role, NotificationType, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import multer from "multer";
import AuthMiddleware from "../middleware/authentication";
import AuthRepository from "../repositories/auth_repository";
import CupidRepository from "../repositories/cupid_repository";
import NotificationRepository from "../repositories/notification_repository";
import UserRepository from "../repositories/user_repository";
import { isStrongPassword } from "../utils/strong_password";
import Jwt from "../utils/jwt";
import { useGeo } from "../utils/geoFunc";
import ProfileRepository from "../repositories/profile_repository";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./server/images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

const UserController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new UserRepository(db);
    const _cupidRepository = new CupidRepository(db);
    const _notificationsRepository = new NotificationRepository(db);
    const _authRepository = new AuthRepository(db);
    const _profileRepository = new ProfileRepository(db);


    router.get("/:id", AuthMiddleware(db), async (req, res) => {
        const { id } = req.params;
        const user = await _repository.findById(parseInt(id));

        if (user) {
            res.send({ user });
        } else {
            res.send({ error: "User not found" });
        }
    });


    router.post("/create", upload.single('file'), async (req, res) => {
        const { userType, firstName, lastName, email, password, age, budget, goals, bio } = req.body;
        const existingUser = await _repository.findByEmail(email)

        if (existingUser) {
            logError("user_controller.ts", "Email already in use")
            res.send({ error: "Email already in use" });
            return;
        }
        const passwordIsStrong = isStrongPassword(password);
        if (!passwordIsStrong.success) {
            res.send({ error: passwordIsStrong.message })
            logError("user_controller.ts", "Password isnt strong enough")
            return;
        }

        switch (userType) {
            case 'Standard':
                const user = await _repository.create({ firstName, lastName, email, password, age: parseInt(age), dailyBudget: parseInt(budget), relationshipGoals: goals })
                if (user) {
                    res.send({ userId: user.id });
                    logInfo(`user_controller.ts`, `${user.email} New Standard Account Created`)
                    await _notificationsRepository.record(user.id, "Welcome to CupidCode!", "You have found the path to smoother dating", NotificationType.DAILY)
                }
                break;
            case 'Cupid':
                const cupid = await _cupidRepository.create({ firstName, lastName, email, password, bio })
                if (cupid) {
                    res.send({ userId: cupid.id });
                    logInfo(`user_controller.ts`, `${cupid.email} New Cupid Account Created `)
                    await _notificationsRepository.record(cupid.id, "Welcome to CupidCode!", "You have found the path to smoother dating", NotificationType.DAILY)
                }
                break;
            default:
                res.send({ error: "Invalid user type" })
        }
    })

    // ************** Update User Password ***************
    router.post("/password", AuthMiddleware(db), async (req, res) => {
        const { currentPassword, newPassword } = req.body
        const user = await _repository.findById(req.user!!.id);

        const resultOfStrongCheck = isStrongPassword(newPassword)
        if (!resultOfStrongCheck.success) {

            res.send({ error: resultOfStrongCheck.message })
            return;
        }

        if (user && bcrypt.compareSync(currentPassword, user.password)) {
            const profile = await _repository.updatePassword(req.user!!.id, newPassword)
            res.send({ message: "Your account was successfully updated", profile })
            logInfo(`user_controller.ts`, "changed their password", req.user!!)
            return;
        } else {
            res.send({ error: "Incorrect Current Password." });
            return;
        }
    });

    // ************** Update User Profile Picture ***************
    router.post('/profileUrl', upload.single('file'), async (req, res) => {
        try {
            await _repository.updatePicture(parseInt(req.body.userId), req!!.file!!.path)
            logInfo(`user_controller.ts`, `Successfully added a profile picture`)
        } catch (error) {
            logError("user_controller", error)
            res.send({ error })
        }
    })

    // ************** Session Login ***************
    router.post("/session", async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await _repository.findByEmail(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            const { accessToken, refreshToken } = Jwt.generateTokens(user);
            await _authRepository.addRefreshTokenToWhitelist({ refreshToken, userId: user.id });
            logInfo("usercontroller", `current user is is of type ${user.role}`)
            if (user.role == Role.CUPID) {
                var location = await useGeo()
                var responseCupid = await _cupidRepository.setLocation(user.cupid!!.id, location.latitude, location.longitude)
                logInfo("user_controller", `The determined location was ${responseCupid.latitude}`)
            }
            if (user.role == Role.STANDARD) {
                var location = await useGeo()
                var responseUser = await _profileRepository.setLocation(user.id, location.latitude, location.longitude)
            }
            logInfo("user_controller", "signed in", user)
            res.send({ user: user, tokens: { accessToken, refreshToken } });
        } else {
            logError("user_controller", `${email} email/password combo was invalid`,)
            res.send({ error: "Invalid login credentials." });
        }
    })

    // ************** Update User Account ***************
    router.post("/update", AuthMiddleware(db), async (req, res) => {
        const { firstName, lastName, email, age, dailyBudget, relationshipGoals } = req.body
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
        const userId = req.user!!.id;
        const updatedAccount = await _repository.update({ userId, firstName, lastName, email, age: workingAge, dailyBudget: workingBudget, relationshipGoals })
        res.send({ message: "Your account was successfully updated", updatedAccount })
        logInfo("user_controller.ts", "Sucessfully updated their account", req.user!!)
        return;
    });

    return router;
}

export default UserController;