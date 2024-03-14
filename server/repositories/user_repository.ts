import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs"

type userPayload = {
    userId?: number,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    age: number,
    dailyBudget: number,
    relationshipGoals: string
}

export default class UserRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }

    findByEmail(email: string) {
        return this.db.user.findUnique({
            where: {
                email,
            },
            include: {
                profile: true,
                cupid: true,
                admin: true,
            },
        });
    }

    create({ firstName, lastName, email, password, age, dailyBudget, relationshipGoals }: userPayload) {
        return this.db.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password!!, 12),
                profile: {
                    create: {
                        age,
                        dailyBudget,
                        relationshipGoals,
                    }
                },
                role: Role.STANDARD,
            },
            include: {
                profile: true,
                cupid: true,
                refreshToken: true,
            }
        });
    }

    findById(id: number) {
        return this.db.user.findUnique({
            where: {
                id,
            },
            include: {
                profile: true,
                cupid: true,
                admin: true,
                refreshToken: true,
            }
        });
    }

    updatePicture(userId: number, photoUrl: string) {
        return this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                photoUrl,
            },
        })
    }

    update({ userId, firstName, lastName, email, age, dailyBudget, relationshipGoals }: userPayload) {
        return this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                profile: {
                    update: {
                        age,
                        dailyBudget,
                        relationshipGoals
                    },
                },
            },
        })
    }

    updatePassword(userId: number, password: string,) {
        return this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                password: bcrypt.hashSync(password, 12)
            },
        })
    }

}