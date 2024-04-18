import { PrismaClient } from "@prisma/client";

export default class AdminRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }

    getUsers() {
        return this.db.user.findMany({
            include: {
                cupid: true
            }
        });
    }
}