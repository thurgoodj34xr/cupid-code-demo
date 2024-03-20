import { NotificationType } from "@prisma/client";
import { FaTicketAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../componets/button/button";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import useContext from "../../hooks/context";
import HandleDeleteNotification from "../../hooks/deleteNotification";
import usePost from "../../hooks/usePost";
import classes from "./ai_assistance.module.css";
import useInit from "../../hooks/useInit";
import useGetCupid from "../../hooks/useGetCupid";

function AiAssistance() {
  const { user, setUser, navigate } = useInit();
  const context = useContext();
  const { data: notificationHistory, setData } = usePost("/notifications/all", {
    notficationType: NotificationType.AIGEN,
  });
  const { cupid } = useGetCupid(user.profile.id, context);

  const handleDeleteNotification = async (notificationId) => {
    const response = await HandleDeleteNotification(notificationId, context);
    if (!response.error) {
      // Filter out the notification with the specified ID
      const updatedNotificationHistory = notificationHistory.filter(
        (notification) => notification.id !== notificationId
      );
      setData(updatedNotificationHistory);
    }
  };

  const purchases = () => {
    navigate("/Purchases");
    1;
  };
  1;

  return (
    <section className={classes.main}>
      <div className={classes.row}>
        <p className="label">Current Cupid</p>
        <p className="pointer" onClick={() => navigate("/SelectCupid")}>
          Select
        </p>
      </div>
      {cupid && <CupidTile cupid={cupid} link="" />}
      <p className="label">Notifications</p>
      <div className="flex flex-col gap-5 max-h-96 overflow-y-auto">
        {!notificationHistory
          ? null
          : notificationHistory.map((notification) => (
              <DailyNotification
                key={notification.id} // Use unique identifier as the key
                notificationId={notification.id}
                title={notification.title}
                body={notification.message}
                time={notification.timeStamp}
                onDelete={handleDeleteNotification}
              />
            ))}
      </div>
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
