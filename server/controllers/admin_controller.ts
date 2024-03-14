import { PrismaClient, Role } from "@prisma/client";
import { Router } from "express";
import AuthMiddleware from "../middleware/authentication";
import AdminRepository from "../repositories/admin_repository";

const AdminController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new AdminRepository(db);
    router.get("/users", AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const users = await _repository.getUsers();
        res.send(users)
    })
    return router;
}
export default AdminController;