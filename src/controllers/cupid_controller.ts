import { Router } from "express"
import { Request, Response, NextFunction } from "express";
import * as Cupid from "../../services/cupid"
const CupidController = () => {
    const router = Router();
    router.get("/all", async (req, res) => {
        const cupids = await Cupid.getAll();
        res.send({ cupids })
    })

    router.get("/changeEmployment", async (req, res) => {
        const { userId, employmentStatus } = req.body
        const response = await Cupid.switchFired(userId, employmentStatus);
        if (response) {
            res.send({ response })
            return;
        } res.send({ error: "Couldn't update employment status" })
    })
    return router;
}

export default CupidController;