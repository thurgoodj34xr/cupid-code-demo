import { PrismaClient } from "@prisma/client";

const CreatePurchases = async (db: PrismaClient) => {
    await db.purchases.create({
        data: {
            userId: 1,
            total: 10,
            jobCost: 7,
            cupidPayout: 3,
            profit: 5,
            details: "Panda Express",
        },
    });

    await db.purchases.create({
        data: {
            id: 2,
            userId: 1,
            total: 15,
            jobCost: 7,
            cupidPayout: 3,
            profit: 5,
            details: "Movie Tickets",
        },
    });
    await db.purchases.create({
        data: {
            id: 3,
            userId: 1,
            total: 5,
            jobCost: 5,
            cupidPayout: 5,
            profit: 5,
            details: "Flowers from Smiths",
        },
    });
}

export default CreatePurchases;