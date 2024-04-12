import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import AuthMiddleware from "../middleware/authentication";
import HireCupidRepository from "../repositories/hire_cupid_repository";
import UserRepository from "../repositories/user_repository";

const HireCupidController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new HireCupidRepository(db);
    const _userRepsitory = new UserRepository(db);

    router.post("/cupid", AuthMiddleware(db), async (req, res, next) => {
        try {
            const { profileId } = req.body;
            let cupid = await _repository.getByProfileId(profileId);
            if (!cupid) {
                res.send({ cupid: null });
            } else {
                const user = await _userRepsitory.findById(cupid!!.cupid.id);
                res.send({ cupid: user });
            }
        } catch (error) {
            logError("hire_cupid_controller", error, req.user!!)
        }
    })

    router.get("/users", AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        try {
            const { cupidId } = req.body;
            const cupids = await _repository.getByCupidId(cupidId);
            res.send({ cupids });
        } catch (error) {
            logError("hire_cupid_controller", error, req.user!!)
        }
    })

    router.post("/hire", AuthMiddleware(db, [Role.STANDARD]), async (req, res, next) => {
        try {
            const { profileId, cupidId } = req.body;

            // Check if the profile has already hired a cupid
            const existingHire = await _repository.getByProfileId(profileId);
            if (existingHire) {
                throw new Error("has already hired a cupid");
            }
            // Hire the cupid
            const cupid = await _repository.create(profileId, cupidId);
            logInfo("hire_cupid_controller", `hired cupid ${cupidId}`, req.user!!);
            res.send({ cupid });
        } catch (error) {
            res.send({ error: "You cannot hire 2 cupids at the same time" });
            logError("hire_cupid_controller", error, req.user!!);
        }
    });



    return router;
}
export default HireCupidController;