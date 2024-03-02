import db from "../utils/prisma";

export function findAllByUserId(userId: any) {
    return db.notifications.findMany({
        where: {
            userId: userId,
        },
    });
}

export function recordNotification(userId: number, title: string, message: string) {
    return db.notifications.create({
        data: {
            userId,
            title,
            message,
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
