import { Router } from "express";
import { NotificationType } from "@prisma/client";
import * as Notifications from "../../services/notifications";


const NotificationController = () => {
    const router = Router();
    // ************** Delete Specific Notification ***************
    router.post("/delete", async (req, res) => {
        const { notificationId } = req.body
        const notification = await Notifications.deleteNotification(notificationId)
        res.send({ notification })
        return;
    });

    // ************** Get All Notifications for User by Type ***************
    router.post("/getAll", async (req, res) => {
        const { userId, notificationType } = req.body
        var notifications = null;
        if (notificationType == NotificationType.ALL) {
            notifications = await Notifications.findAllByUserId(userId)
        } else {
            notifications = await Notifications.findAllByUserIdWithType(userId, notificationType)
        }
        res.send({ notifications })
        return;
    });

    // ************** Record Notification ***************
    router.post("/record", async (req, res) => {
        const { userId, title, message, notificationType } = req.body
        if (notificationType == NotificationType.ALL) {
            res.send({ error: "You cannot create a notification type ALL" })
        }
        const notification = await Notifications.recordNotification(userId, title, message, notificationType)
        res.send({ message: "Your message was sent", notification })
        return;
    });

    return router;
}

export default NotificationController