import Api from "./api"
const HandleDeleteNotification = async (notificationId, context) => {
    return await Api.PostWithAuth(
        "/notifications/delete",
        { notificationId },
        context
    );

};
export default HandleDeleteNotification