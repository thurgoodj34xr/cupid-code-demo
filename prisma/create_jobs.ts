import { PrismaClient } from "@prisma/client";

const CreateJobs = async (db: PrismaClient) => {
    await db.jobs.createMany({
        data: [
            {
                name: "Panda Express",
                details: "Ordering Orange Chicken and Chow Mein",
                cupidId: 1,
                userId: 1,
                longitude: 0,
                latitude: 0,
                total: 100,
                cupidPayout: 50,
                complete: false,
            },
            {
                name: "Flowers",
                details: "Purchasing a bouquet of roses",
                cupidId: 1,
                userId: 1,
                longitude: 0,
                latitude: 0,
                total: 200,
                cupidPayout: 100,
                complete: false,
            },
            {
                name: "Movie Tickets",
                details: "Purchased tickets for a movie",
                cupidId: 1,
                userId: 1,
                longitude: 0,
                latitude: 0,
                total: 300,
                cupidPayout: 150,
                complete: false,
            },
        ],
    });
};

export default CreateJobs;