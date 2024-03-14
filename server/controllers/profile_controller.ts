import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import AuthMiddleware from "../middleware/authentication";
import ProfileRepository from "../repositories/profile_repository";
import PurchasesRepository from "../repositories/purchases_repository";


const ProfileController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new ProfileRepository(db);

    const _purchasesRepository = new PurchasesRepository(db);
    // ************** Adding CupidCash in Account ***************
    router.post("/cash", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const { changeAmount } = req.body
        try {
            const user = await _repository.findById(req.user!!.id)
            const currentBalance = user!!.profile!!.balance.toNumber();
            var workingChangeAmount = Math.abs(changeAmount)
            const newBalance = currentBalance + workingChangeAmount;
            if (newBalance < 0) {
                res.send({ error: "Cannot Spend more money then you have!" })
                return;
            }
            await _repository.updateBalance(req.user!!.id, newBalance)
            await _purchasesRepository.record(req.user!!.id, null, workingChangeAmount, 0, 0, workingChangeAmount, "Cupid Bucks Purchase")
            res.send({ newBalance });
            logInfo("profile_controller", `purchased ${changeAmount} cupid cash`, req.user!!)
            return;
        } catch (error) {
            logError("profile_controller", error, req.user!!)
            res.send({ error: "Access Denied" })
            return;
        }
    });

    // ************** Hiring Cupid ***************
    router.post("/hireCupid", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const { cupid } = req.body
        try {
            const user = await _repository.findById(req.user!!.id)
            const hireCupid = await _repository.updateCupid(req.user!!.id, cupid.id)
            logInfo("profile_controller", `hired cupid ${cupid.id}`, req.user!!)
            res.send({ message: "Hired Cupid" })
            return;
        } catch (error) {
            logError("profile_controller", error, req.user!!)
            res.send({ error: "Access Denied" })
            return;
        }

    })

    return router;
}

export default ProfileController;