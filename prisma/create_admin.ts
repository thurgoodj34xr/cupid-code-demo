import { PrismaClient, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

const CreateAdmins = async (db: PrismaClient) => {
    await db.user.upsert({
        where: {
            id: 7,
        },
        create: {
            id: 7,
            firstName: "ADMIN",
            lastName: "USER",
            email: "admin@gmail.com",
            password: bcryptjs.hashSync('admin'),
            photoUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.ADMIN,
            admin: {
                create: {
                    id: 1,
                }
            }
        },
        update: {}
    })
}

export default CreateAdmins;