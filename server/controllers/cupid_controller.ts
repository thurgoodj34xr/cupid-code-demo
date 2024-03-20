import { Router } from "express"
import { PrismaClient, Role } from "@prisma/client";
import CupidRepository from "../repositories/cupid_repository";
import AuthMiddleware from "../middleware/authentication";
import UserRepository from "../repositories/user_repository";

const CupidController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new CupidRepository(db);
    const _userRepsitory = new UserRepository(db);

    router.get("/all", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const cupids = await _repository.getAll();
        res.send(cupids)
    })

    router.post("/get", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const { cupidId } = req.body;
        try {
            const cupid = await _repository.findById(cupidId);
            res.send(cupid);
        } catch (error) {
            res.send({ error: "Cupid not found" })
        }
    })

    router.post("/working", AuthMiddleware(db, [Role.CUPID, Role.STANDARD]), async (req, res) => {
        const { working } = req.body;
        const user = await _userRepsitory.findById(req.user!!.id);
        const id = user?.cupid!!.id;
        await _repository.setWorking(id!!, working)
        res.send({ message: "Working status updated" })
        logInfo("cupid_controller.ts", `${working ? "started working" : "has stopped working"}`, req.user!!)
    })

    router.post("/status", AuthMiddleware(db, [Role.CUPID, Role.STANDARD, Role.ADMIN]), async (req, res) => {
        try {
            const { cupidId } = req.body;
            const status = await _repository.getWorking(cupidId);
            res.send({ status: status!!.working });
        } catch (error) {
            logError("cupid_controller.ts", error, req.user!!)
            res.send({ error: "Error getting working status" });
        }
    })

    return router;
}

export default CupidController;