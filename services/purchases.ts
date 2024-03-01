import db from "../utils/prisma";

export function findAllByUserId(userId: any) {
    return db.purchases.findMany({
        where: {
            userId: userId,
        },
    });
}

export function recordPurchase(userId: number, cupidId: any, total: number, jobCost: number, cupidPayout: number, profit: number, details: string) {
    return db.purchases.create({
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