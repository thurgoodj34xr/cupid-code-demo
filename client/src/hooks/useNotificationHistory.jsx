import { useContext, useState, useEffect } from "react";
import AppContext from "../componets/app_context";
import GetNotificationHistory from "./notificationHistory";
import { NotificationType } from "@prisma/client";

const useNotificationHistory = () => {
  const [notificationHistory, setNotificationHistory] = useState([]);
  const context = useContext(AppContext);
  useEffect(() => {
    GetNotificationHistory(
      context.getUser().userId,
      NotificationType.DAILY,
      context
    ).then((resp) => setNotificationHistory(resp));
  }, []);
  return notificationHistory;
};

export default useNotificationHistory;
