import { Router } from "express"
import { PrismaClient, Role } from "@prisma/client";
import UserRepository from "../repositories/user_repository";
import PurchasesRepository from "../repositories/purchases_repository";
import AuthMiddleware from "../middleware/authentication";
import ProfileRepository from "../repositories/profile_repository";

const PurchasesController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new PurchasesRepository(db);
    const _userRepository = new UserRepository(db);
    const _profileRepository = new ProfileRepository(db);

    // ************** Get Purchase History ***************
    router.post("/history", AuthMiddleware(db, [Role.STANDARD, Role.ADMIN, Role.CUPID]), async (req, res) => {
        const purchases = await _repository.findAllByUserId(req.user!!.id)
        res.send(purchases)
    });

    // ************** Record Purchase ***************
    router.post("/record", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const { cupidId, total, jobCost, details } = req.body
        try {
            var workingTotal = Math.abs(total)
            var workingJobCost = Math.abs(jobCost)
            const user = await _userRepository.findById(req.user!!.id);
            const currentBalance = user!!.profile!!.balance.toNumber();
            const newBalance = currentBalance - workingTotal;
            if (newBalance < 0) {
                res.send({ error: "Cannot Spend more money then you have!" })
                return;
            }
            await _profileRepository.updateBalance(req.user!!.id, newBalance)
            const cupidPayout = (workingTotal - workingJobCost) * .6
            const profit = (workingTotal - workingJobCost) * .4
            var purchase = await _repository.record(req.user!!.id, cupidId, workingTotal, workingJobCost, cupidPayout, profit, details)
            res.send({ message: "Purchase successfully completed", purchase, newBalance: newBalance })
            logInfo("purchases_controller", `purchased ${details}`, req.user!!)
            return;
        } catch (error) {
            logError("purchases_controller", error, req.user!!)
            res.send({ error: "Access Denied" })
        }
    });
    return router;
}
export default PurchasesController
