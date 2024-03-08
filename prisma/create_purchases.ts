import { PrismaClient } from "@prisma/client";

const CreatePurchases = async (db: PrismaClient) => {
    await db.purchases.upsert({
        where: {
            id: 1,
        },
        create: {
            userId: 1,
            total: 10,
            jobCost: 7,
            cupidPayout: 3,
            profit: 5,
            details: "Panda Express",
        },
        update: {}
    });

    await db.purchases.upsert({
        where: {
            id: 2,
        },
        create: {
            id: 2,
            userId: 1,
            total: 15,
            jobCost: 7,
            cupidPayout: 3,
            profit: 5,
            details: "Movie Tickets",
        },
        update: {}
    });
    await db.purchases.upsert({
        where: {
            id: 3,
        },
        create: {
            id: 3,
            userId: 1,
            total: 5,
            jobCost: 5,
            cupidPayout: 5,
            profit: 5,
            details: "Flowers from Smiths",
        },
        update: {}
    });
}

export default CreatePurchases;