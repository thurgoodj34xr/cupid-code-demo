import { Jobs, PrismaClient } from "@prisma/client";

export default class JobRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }

    async createJob(id: number, cupidId: number | null, userId: number, longitude: number, latitude: number, cupidPayout: number, complete: boolean): Promise<Jobs> {
        return this.db.jobs.create({
            data: {
                id,
                cupidId,
                userId,
                longitude,
                latitude,
                cupidPayout,
                complete,
            },
        });
    }

    async getJobById(jobId: number) {
        return this.db.jobs.findUnique({
            where: { id: jobId },
        });
    }

    updateJob(jobId: number, jobData: Partial<Jobs>) {
        return this.db.jobs.update({
            where: { id: jobId },
            data: jobData,
        });
    }

    deleteJob(jobId: number) {
        return this.db.jobs.delete({
            where: { id: jobId },
        });
    }

    getAllByUserId(userId: number) {
        return this.db.jobs.findMany({
            where: { userId },
        });
    }
    getAllByCupidId(cupidId: number) {
        return this.db.jobs.findMany({
            where: { cupidId },
        });
    }
}