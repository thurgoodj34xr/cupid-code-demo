import { PrismaClient } from "@prisma/client";

export default class JobsRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }

    getJobs() {
        return this.db.jobs.findMany();
    }
}