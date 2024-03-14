import { NotificationType, PrismaClient } from "@prisma/client";

const CreateNotifications = async (db: PrismaClient) => {
    await db.notifications.upsert({
        where: {
            id: 1,
        },
        create: {
            id: 1,
            userId: 1,
            title: "Welcome to CupidCode!",
            message: "You have found the path to smoother dating",
            type: NotificationType.DAILY,
        },
        update: {

        }
    })
    await db.notifications.upsert({
        where: {
            id: 2,
        },
        create: {
            id: 2,
            userId: 1,
            title: "Smell Good",
            message: "Consider putting on some cologne today to help you smell better",
            type: NotificationType.DAILY,
        },
        update: {}
    })
    await db.notifications.upsert({
        where: {
            id: 3,
        },
        create: {
            id: 3,
            userId: 1,
            title: "Welcome to CupidCode!",
            message: "You have found the path to smoother dating",
            type: NotificationType.DAILY,
        },
        update: {}
    })

    await db.notifications.upsert({
        where: {
            id: 4,
        },
        create: {
            id: 4,
            userId: 1,
            title: "Smell Good",
            message: "Consider putting on some cologne today to help you smell better",
            type: NotificationType.DAILY,
        },
        update: {}
    })

    await db.notifications.upsert({
        where: {
            id: 5,
        },
        create: {
            id: 5,
            userId: 1,
            title: "Date Night Ideas",
            message: "Looking for date night ideas? Check out our latest blog post for inspiration!",
            type: NotificationType.DAILY,
        },
        update: {}
    })

    await db.notifications.upsert({
        where: {
            id: 6,
        },
        create: {
            id: 6,
            userId: 1,
            title: "Love Quiz",
            message: "Take our love compatibility quiz today and discover your perfect match!",
            type: NotificationType.DAILY,
        },
        update: {}
    })
    const notification5 = await db.notifications.upsert({
        where: {
            id: 7,
        },
        create: {
            id: 7,
            userId: 1,
            title: "Personalized Date Suggestions",
            message: "Discover personalized date suggestions tailored just for you!",
            type: NotificationType.AIGEN,
        },
        update: {}
    })

    const notification6 = await db.notifications.upsert({
        where: {
            id: 8,
        },
        create: {
            id: 8,
            userId: 1,
            title: "Exclusive Match Recommendations",
            message: "Check out our exclusive match recommendations based on your preferences!",
            type: NotificationType.AIGEN,
        },
        update: {}
    })
}
export default CreateNotifications;