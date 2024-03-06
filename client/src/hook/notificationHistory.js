import * as Api from "./api"
async function GetNotificationHistory(userId, notificationType, context,) {
    var response = await Api.PostWithAuth(
        "/notifications/all",
        { userId, notificationType: notificationType },
        context
    );
    return response.notifications;
}
export default GetNotificationHistory