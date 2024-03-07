import { Router } from "express"
import { PrismaClient, Role } from "@prisma/client";
import CupidRepository from "../repositories/cupid_repository";
import AuthMiddleware from "../middleware/authentication";

const CupidController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new CupidRepository(db);

    router.get("/all", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const cupids = await _repository.getAll();
        res.send({ cupids })
    })

    return router;
}

export default CupidController;