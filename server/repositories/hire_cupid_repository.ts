import { PrismaClient } from "@prisma/client";

export default class HireCupidRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }

    getById(profileId: number) {
        return this.db.hireCupid.findUnique({
            where: {
                profileId
            },
            include: {
                profile: true,
                cupid: true,
            }
        });

    }

    getByProfileId(profileId: number) {
        return this.db.hireCupid.findUnique({
            where: {
                profileId
            },
            include: {
                profile: true,
                cupid: true,
            }
        }
        );
    }

    getByCupidId(cupidId: number) {
        return this.db.hireCupid.findMany({
            where: {
                cupidId,
            }
        })
    }

    async create(profileId: number, cupidId: number) {
        await this.db.hireCupid.create({
            data: {
                profileId,
                cupidId,
            }
        })
        return this.getByProfileId(profileId);
    }

    delete(profileId: number) {
        return this.db.hireCupid.delete({
            where: {
                profileId,
            }
        })
    }
}