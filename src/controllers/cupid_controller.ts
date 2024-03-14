import { Router } from "express"
import { Request, Response, NextFunction } from "express";
import * as Cupid from "../../services/cupid"
const CupidController = () => {
    const router = Router();
    router.get("/all", async (req, res) => {
        const cupids = await Cupid.getAll();
        res.send({ cupids })
    })
    return router;
}

export default CupidController;