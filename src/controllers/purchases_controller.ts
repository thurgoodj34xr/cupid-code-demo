import { Router } from "express"
import * as User from "../../services/user";
import * as Purchases from "../../services/purchases";

const PurchasesController = () => {
    const router = Router();

    // ************** Get Purchase History ***************
    router.post("/history", async (req, res) => {
        const { userId } = req.body
        const purchases = await Purchases.findAllByUserId(userId)
        res.send({ purchases })
        return;
    });

    // ************** Record Purchase ***************
    router.post("/record", async (req, res) => {
        const { userId, cupidId, total, jobCost, details } = req.body
        try {
            var workingTotal = Math.abs(total)
            var workingJobCost = Math.abs(jobCost)
            const user = await User.findUserById(userId);
            const currentBalance = user!!.profile!!.balance.toNumber();
            const newBalance = currentBalance - workingTotal;
            if (newBalance < 0) {
                res.send({ error: "Cannot Spend more money then you have!" })
                return;
            }
            await User.updateUserBalance(userId, newBalance)
            const cupidPayout = (workingTotal - workingJobCost) * .6
            const profit = (workingTotal - workingJobCost) * .4
            var purchase = await Purchases.recordPurchase(userId, cupidId, workingTotal, workingJobCost, cupidPayout, profit, details)
            res.send({ message: "Purchase successfully completed", purchase, newBalance: newBalance })
            return;
        } catch (error) {
            console.log({ error })
            res.send({ error: "Access Denied" })
        }
    });


    return router;
}
export default PurchasesController
