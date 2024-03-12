import { NotificationType } from "@prisma/client";
import { useContext } from "react";
import { FaMoneyBill } from "react-icons/fa";
import AppContext from "../../componets/app_context";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import HandleDeleteNotification from "../../hooks/deleteNotification";
import useInit from "../../hooks/useInit";
import usePost from "../../hooks/usePost";
import classes from "./home.module.css";

function Home() {
  const { user, navigate } = useInit();
  const { data: notificationHistory, setData } = usePost("/notifications/all", {
    notficationType: NotificationType.DAILY,
  });

  const { data: purchaseHistory } = usePost("/purchases/history");
  const context = useContext(AppContext);

  const handleDeleteNotification = async (notificationId) => {
    console.log(notificationId);
    const response = await HandleDeleteNotification(notificationId, context);
    if (!response.error) {
      // Filter out the notification with the specified ID
      const removeItem = notificationHistory.filter((n, idx) => {
        return n.id !== notificationId;
      });
      setData(removeItem);
    }
  };
  1;
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
        {!notificationHistory || notificationHistory.length == 0 ? (
          <p className="label center">You currently have 0 notifications</p>
        ) : (
          notificationHistory.map((notification) => (
            <DailyNotification
              key={notification.id} // Use unique identifier as the key
              notificationId={notification.id}
              title={notification.title}
              body={notification.message}
              time={notification.timeStamp}
              onDelete={() => handleDeleteNotification(notification.id)}
            />
          ))
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
