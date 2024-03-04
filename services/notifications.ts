import db from "../utils/prisma";
import { NotificationType } from "@prisma/client";


export function findAllByUserId(userId: any) {
    return db.notifications.findMany({
        where: {
            userId: userId,
        },
    });
}

export function findAllByUserIdWithType(userId: any, notificationType: NotificationType) {
    return db.notifications.findMany({
        where: {
            userId: userId,
            type: notificationType
        },
    });
}

export function recordNotification(userId: number, title: string, message: string, notificationType: NotificationType) {
    return db.notifications.create({
        data: {
            userId,
            title,
            message,
            type: notificationType
        }
    })
}

export function deleteNotification(notificationId: number) {
    return db.notifications.delete({
        where: {
            id: notificationId
        }
    })
}
