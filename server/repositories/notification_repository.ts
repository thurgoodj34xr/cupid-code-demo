import { NotificationType, PrismaClient } from "@prisma/client";

export default class NotificationRepository {
    private db: PrismaClient;
    constructor(db: PrismaClient) {
        this.db = db;
    }
    findAllByUserId(userId: any) {
        return this.db.notifications.findMany({
            where: {
                userId: userId,
            },
        });
    }

    findAllByUserIdWithType(userId: any, notificationType: NotificationType) {
        return this.db.notifications.findMany({
            where: {
                userId: userId,
                type: notificationType
            },
        });
    }

    record(userId: number, title: string, message: string, notificationType: NotificationType) {
        return this.db.notifications.create({
            data: {
                userId,
                title,
                message,
                type: notificationType
            }
        })
    }

    delete(notificationId: number) {
        return this.db.notifications.delete({
            where: {
                id: notificationId
            }
        })
    }
}