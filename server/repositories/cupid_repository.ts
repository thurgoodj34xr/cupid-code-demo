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

    findById(id: number) {
        return this.db.cupid.findUnique({
            where: {
                id,
            },
            include: {
                user: true,
            }
        });
    }

    setLocation(id: number, lat: number, long: number) {
        return this.db.cupid.update({
            where: {
                id,
            },
            data: {
                latitude: lat,
                longitude: long
            }
        });
    }

    setWorking(id: number, working: boolean) {
        return this.db.cupid.update({
            where: {
                id,
            },
            data: {
                working,
            }
        });
    }

    getWorking(id: number) {
        return this.db.cupid.findUnique({
            where: {
                id,
            },
        });
    }

    getAvailable() {
        return this.db.cupid.findMany({
            where: {
                working: true,
            },
            include: {
                user: true,
            },
        });
    }

    delete(profileId: number, cupidId: number) {
        console.log(profileId)
        console.log(cupidId)
        return this.db.hireCupid.delete({
            where: {
                profileId_cupidId: {
                    profileId,
                    cupidId,
                }
            }
        })
    }
}