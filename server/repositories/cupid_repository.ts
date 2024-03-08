import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs"

export default class CupidRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }

    create(user: any) {
        user.password = bcrypt.hashSync(user.password, 12);
        const { firstName, lastName, email, password, bio } = user;
        return this.db.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: password,
                role: Role.CUPID,
                cupid: {
                    create: {
                        bio: bio
                    }
                }
            },
            include: {
                cupid: true,
                refreshToken: true,
            }
        });
    }

    getAll() {
        return this.db.user.findMany({
            where: {
                role: Role.CUPID,
            },
            include: {
                cupid: true,
            },
        });
    }
}