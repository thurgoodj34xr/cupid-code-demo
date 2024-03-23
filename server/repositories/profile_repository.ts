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

    setLocation(userId: number, lat: number, long: number) {
        return this.db.user.update({
            where: {
                id: userId,
            },
            data: {
                profile: {
                    update: {
                        latitude: lat,
                        longitude: long,
                    },
                },
            },
        })
    }
}