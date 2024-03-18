import { PrismaClient } from "@prisma/client";

export default class ProfileRepository {
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
            },
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
                refreshToken: true,
            }
        });
    }

    updateBalance(userId: number, newBalance: number) {
        return this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                profile: {
                    update: {
                        balance: newBalance,
                    },
                },
            },
        })
    }
    async updateCupid(userId: number, cupidId: number) {
        await this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                profile: {
                    update: {
                        cupidId,
                    },
                },
            },
            include: {
                profile: true,
            }
        })

        return this.db.cupid.findUnique({
            where: {
                id: cupidId,
            },
            include: {
                user: true,
            }
        })

    }
}