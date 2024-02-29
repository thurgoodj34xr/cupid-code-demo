import db from "../utils/prisma";

export function findAllByUserId(userId: any) {
    return db.purchases.findMany({
        where: {
            userId: userId,
        },
    });
}