import { Router } from "express"
import { PrismaClient, Role } from "@prisma/client";
import CupidRepository from "../repositories/cupid_repository";
import AuthMiddleware from "../middleware/authentication";
import UserRepository from "../repositories/user_repository";
import HireCupidRepository from "../repositories/hire_cupid_repository";

const CupidController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new CupidRepository(db);
    const _userRepsitory = new UserRepository(db);
    const _hireRepository = new HireCupidRepository(db);

    router.get("/all", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const cupids = await _repository.getAll();
        res.send(cupids)
    })

    router.get("/me/:id", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const { id } = req.params;
        try {
            const hire = await _hireRepository.getById(parseInt(id));
            if (hire == null) {
                res.status(200).send({ error: "Cupid not found" })
                return;
            }
            const cupid = await _repository.findById(hire!!.cupidId);
            res.status(200).send(cupid);
        } catch (error) {
            res.status(200).send()
        }
    });

    router.get("/available", AuthMiddleware(db, [Role.STANDARD]), async (req, res) => {
        const availableCupids = await _repository.getAvailable();
        res.send(availableCupids);
    });

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
        cupidStatus();
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

    router.post("/fire", AuthMiddleware(db, [Role.STANDARD]), async (req, res, next) => {
        try {
            const { cupidId } = req.body;
            const user = await _userRepsitory.findById(req.user!!.id);
            // Fire the cupid
            await _repository.delete(user!!.profile!!.id, cupidId);
            logInfo("hire_cupid_controller", `fired their cupid`, user!!);
            res.status(200).send({ success: true });
        } catch (error) {
            res.status(401).send({ error: error })
            logError("hire_cupid_controller", error, req.user!!);
        }
    });


    router.post("/hire", AuthMiddleware(db, [Role.STANDARD]), async (req, res, next) => {
        try {
            const { profileId, cupidId } = req.body;
            // Hire the cupid   
            const cupid = await _hireRepository.create(profileId, cupidId);
            logInfo("hire_cupid_controller", `hired cupid ${cupidId}`, req.user!!);
            res.send({ cupid });
        } catch (error) {
            res.send({ error: "You cannot hire 2 cupids at the same time" });
            logError("hire_cupid_controller", error, req.user!!);
        }
    });

    router.post("/terminate", AuthMiddleware(db, [Role.ADMIN]), async (req, res) => {
        const { cupidId, terminate } = req.body;
        console.log(cupidId)
        await _repository.terminate(cupidId, terminate)
        res.send({ message: "Terminated cupid number" + cupidId })
        logInfo("cupid_controller.ts", `${terminate ? "terminated" : "reinstated"}`, cupidId)
        cupidStatus();
    });



    return router;
}

export default CupidController;