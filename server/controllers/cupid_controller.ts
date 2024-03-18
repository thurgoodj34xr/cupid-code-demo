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
    return router;
}

export default CupidController;