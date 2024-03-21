import { Jobs, PrismaClient } from "@prisma/client";

type JobPayload = {
    cupidId: number;
    userId: number;
    name: string;
    details: string
    longitude: number;
    latitude: number;
    cupidPayout: number;
    total: number;
};

// Rest of the code...

export default class JobRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }

    async createJob({ cupidId, userId, name, details, longitude, latitude, cupidPayout, total }: JobPayload) {
        return this.db.jobs.create({
            data: {
                cupidId,
                userId,
                name,
                details,
                longitude,
                latitude,
                cupidPayout,
                total,
                complete: false
            },
        });
    }

    async getJobById(jobId: number) {
        return this.db.jobs.findUnique({
            where: { id: jobId },
        });
    }

    updateJob(jobId: number, data: Partial<JobPayload>) {
        return this.db.jobs.update({
            where: { id: jobId },
            data: {
                ...data,
            }
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