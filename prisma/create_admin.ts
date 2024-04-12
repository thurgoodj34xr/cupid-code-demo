import { PrismaClient, Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

const CreateAdmins = async (db: PrismaClient) => {
    await db.user.upsert({
        where: {
            email: "admin@gmail.com",
        },
        create: {
            firstName: "ADMIN",
            lastName: "USER",
            email: "admin@gmail.com",
            password: bcryptjs.hashSync('admin'),
            photoUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            role: Role.ADMIN,
            admin: {
                create: {
                }
            }
        },
        update: {}
    })
}

export default CreateAdmins;