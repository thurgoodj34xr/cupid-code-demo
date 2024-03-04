import * as Api from "./api"
const HandleDeleteNotification = async (notificationId, context) => {
    return await Api.PostWithAuth(
        "/deleteNotification",
        { notificationId },
        context
    );

};
export default HandleDeleteNotification