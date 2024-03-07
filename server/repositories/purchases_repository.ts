import { PrismaClient } from "@prisma/client";

export default class PurchasesRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }

    findAllByUserId(userId: number) {
        return this.db.purchases.findMany({
            where: {
                userId,
            },
        });
    }

    record(userId: number, cupidId: any, total: number, jobCost: number, cupidPayout: number, profit: number, details: string) {
        return this.db.purchases.create({
            data: {
                userId,
                cupidId,
                total,
                jobCost,
                cupidPayout,
                profit,
                details,
            },
        });
    }
}