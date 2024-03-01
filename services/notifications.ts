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

export function changeReadState(notificationId: number, read: boolean) {
    return db.notifications.update({
        where: {
            id: notificationId,
        },
        data: {
            read: read
        }
    })
}
