import { PrismaClient } from "@prisma/client"
import bcryptjs from "bcryptjs";

const CreateUsers = async (db: PrismaClient) => {
    await db.user.upsert({
        where: {
            email: "user@gmail.com",
        },
        create: {
            firstName: "John",
            lastName: "Doe",
            email: "user@gmail.com",
            password: bcryptjs.hashSync('user'),
            photoUrl: "https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg",
            profile: {
                create: {
                    age: 23,
                    dailyBudget: 15,
                    relationshipGoals: "Go on a lot of dates",
                }
            },
        },
        update: {}
    })
}
export default CreateUsers;