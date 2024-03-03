import * as Api from "./api"
async function GetNotificationHistory(userId, notificationType, context,) {
    var response = await Api.PostWithAuth(
        "/getNotificationHistory",
        { userId, notificationType: notificationType },
        context
    );
    return response.notifications;
}
export default GetNotificationHistory