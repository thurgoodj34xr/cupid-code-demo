import { Router } from "express";
import { NotificationType, PrismaClient } from "@prisma/client";
import NotificationRepository from "../repositories/notification_repository";
import AuthMiddleware from "../middleware/authentication";


const NotificationController = (db: PrismaClient) => {
    const router = Router();
    const _respository = new NotificationRepository(db);

    // ************** Delete Specific Notification ***************
    router.post("/delete", AuthMiddleware(db), async (req, res) => {
        const { notificationId } = req.body
        const notification = await _respository.delete(notificationId)
        logInfo("notification_controller", `dismissed the notification '${notification.title}'`, req.user!!)
        res.send({ notification })
        return;
    });

    // ************** Get All Notifications for User by Type ***************
    router.post("/all", AuthMiddleware(db), async (req, res) => {
        const { notificationType } = req.body
        var notifications = null;
        if (notificationType == NotificationType.ALL) {
            notifications = await _respository.findAllByUserId(req.user!!.id)
        } else {
            notifications = await _respository.findAllByUserIdWithType(req.user!!.id, notificationType)
        }
        res.send(notifications)
        return;
    });

    // ************** Record Notification ***************
    router.post("/record", AuthMiddleware(db), async (req, res) => {
        const { title, message, notificationType } = req.body
        if (notificationType == NotificationType.ALL) {
            res.send({ error: "You cannot create a notification type ALL" })
            logError("notification_controller.ts", "Failed to create notification", req.user!!)
        }
        const notification = await _respository.record(req.user!!.id, title, message, notificationType)
        res.send({ message: "Your message was sent", notification })
        logInfo("notifiation_controller", `created a notification`, req.user!!)
        return;
    });

    return router;
}

export default NotificationController