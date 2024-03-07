import { NotificationType } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import HandleDeleteNotification from "../../hooks/deleteNotification";
import GetNotificationHistory from "../../hooks/notificationHistory";
import PurchaseHistory from "../../hooks/purchases";
import classes from "./home.module.css";
import useContext from "../../hooks/context";

function Home() {
  const context = useContext();
  const navigate = useNavigate();
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState();

  const user = context.getUser();

  const getNotificationHistory = async () => {
    const notifications = await GetNotificationHistory(
      user.id,
      NotificationType.DAILY,
      context
    );
    setNotificationHistory(notifications);
  };

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

  useEffect(() => {
    PurchaseHistory(user.id, context, setPurchaseHistory);
    getNotificationHistory();
  }, []);

  return (
    <section className={classes.container}>
      {/* Container for Budget */}
      <section className={classes.budget}>
        <h2>Good Morning,</h2>
        <p className="label">Summary of your budget</p>
        <hr />
        <section className={classes.balance}>
          <section>
            <p>Balance</p>
            {user.profile && <p>${user.profile.balance}</p>}
          </section>
          <section>
            <p>Daily budget</p>
            {user.profile && <p>${user.profile.dailyBudget}</p>}
          </section>
        </section>
      </section>

      {/* Container for Daily Notifications */}
      <p className="label">Daily Notifications</p>
      <section className={classes.dailyNotifications}>
        {notificationHistory.length > 0 ? (
          notificationHistory.map((notification) => (
            <DailyNotification
              key={notification.id} // Use unique identifier as the key
              notificationId={notification.id}
              title={notification.title}
              body={notification.message}
              time={notification.timeStamp}
              onDelete={handleDeleteNotification}
            />
          ))
        ) : (
          <p className="center label"> You currently have 0 notifications</p>
        )}
      </section>
      <div className="flex row between">
        <p className="label">Recent Purchases</p>
        <p className="pointer" onClick={() => navigate("/Purchases")}>
          View All
        </p>
      </div>
      {purchaseHistory &&
        purchaseHistory.map((purchase, idx) => (
          <PurchaseTile
            key={idx}
            title={purchase.details}
            amount={purchase.total}
            icon={<FaMoneyBill size="2rem" />}
          />
        ))}
    </section>
  );
}

export default Home;
