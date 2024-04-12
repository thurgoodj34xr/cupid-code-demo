import { NotificationType, PrismaClient } from "@prisma/client";

const CreateNotifications = async (db: PrismaClient) => {
    await db.notifications.create({
        data: {
            userId: 1,
            title: "Welcome to CupidCode!",
            message: "You have found the path to smoother dating",
            type: NotificationType.DAILY,
        },
    })
    await db.notifications.create({
        data: {
            userId: 1,
            title: "Smell Good",
            message: "Consider putting on some cologne today to help you smell better",
            type: NotificationType.DAILY,
        },
    })
    await db.notifications.create({
        data: {
            userId: 1,
            title: "Welcome to CupidCode!",
            message: "You have found the path to smoother dating",
            type: NotificationType.DAILY,
        },
    })

    await db.notifications.create({
        data: {
            userId: 1,
            title: "Smell Good",
            message: "Consider putting on some cologne today to help you smell better",
            type: NotificationType.DAILY,
        },
    })

    await db.notifications.create({
        data: {
            userId: 1,
            title: "Date Night Ideas",
            message: "Looking for date night ideas? Check out our latest blog post for inspiration!",
            type: NotificationType.DAILY,
        },
    })

    await db.notifications.create({
        data: {
            userId: 1,
            title: "Love Quiz",
            message: "Take our love compatibility quiz today and discover your perfect match!",
            type: NotificationType.DAILY,
        },
    })
    const notification5 = await db.notifications.create({
        data: {
            userId: 1,
            title: "Personalized Date Suggestions",
            message: "Discover personalized date suggestions tailored just for you!",
            type: NotificationType.AIGEN,
        },
    })

    const notification6 = await db.notifications.create({
        data: {
            userId: 1,
            title: "Exclusive Match Recommendations",
            message: "Check out our exclusive match recommendations based on your preferences!",
            type: NotificationType.AIGEN,
        },
    })
}
export default CreateNotifications;