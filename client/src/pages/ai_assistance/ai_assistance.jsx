import { NotificationType } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../componets/button/button";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import HandleDeleteNotification from "../../hooks/deleteNotification";
import GetNotificationHistory from "../../hooks/notificationHistory";
import classes from "./ai_assistance.module.css";
import useContext from "../../hooks/context";

function AiAssistance() {
  const context = useContext();
  const user = context.getUser();
  const [notificationHistory, setNotificationHistory] = useState([]);
  const getNotificationHistory = async () => {
    const notifications = await GetNotificationHistory(
      user.id,
      NotificationType.AIGEN,
      context
    );
    setNotificationHistory(notifications);
  };
  useEffect(() => {
    getNotificationHistory();

    return () => {};
  }, []);
  const handleDeleteNotification = async (notificationId) => {
    const response = await HandleDeleteNotification(notificationId, context);
    if (!response.error) {
      // Filter out the notification with the specified ID
      const updatedNotificationHistory = notificationHistory.filter(
        (notification) => notification.id !== notificationId
      );
      setNotificationHistory(updatedNotificationHistory);
    }
  };

  let navigate = useNavigate();

  const purchases = () => {
    navigate("/Purchases");1
  };1

  return (
    <section className={classes.main}>
      <div className={classes.row}>
        <p className="label">Current Cupid</p>
        <p className="pointer" onClick={() => navigate("/SelectCupid")}>
          Select
        </p>
      </div>
      <CupidTile name="Jake" distance="0.5 mi" />
      <p className="label">Notifications</p>
      {notificationHistory.map((notification) => (
        <DailyNotification
          key={notification.id} // Use unique identifier as the key
          notificationId={notification.id}
          title={notification.title}
          body={notification.message}
          time={notification.timeStamp}
          onDelete={handleDeleteNotification}
        />
      ))}
      <div className={classes.row}>
        <p className="label">Recent Purchases</p>
        <p className="pointer" onClick={purchases}>
          View All
        </p>
      </div>
      <PurchaseTile
        title="Movie Tickets"
        amount="25"
        icon={<FaTicketAlt size="4rem" />}
        time="5m"
      />
      <Button text="Import Transcript" />
      <Button text="Start Listening" />
    </section>
  );
}

export default AiAssistance;
