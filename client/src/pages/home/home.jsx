import Navbar from "../../componets/navbar/navbar";
import classes from "./home.module.css";
import * as Api from "../../hook/api";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../componets/app_context";
import PurchaseHistory from "../../hook/purchases";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const context = useContext(AppContext);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState();
  const user = context.getUser();
  const navigate = useNavigate();

  async function getNotificationHistory() {
    const userId = user.id;
    var response = await Api.PostWithAuth(
      "/getNotificationHistory",
      { userId },
      context
    );
    setNotificationHistory(response.notifications);
  }
  useEffect(() => {
    getNotificationHistory();

    return () => {};
  }, []);

  const handleDeleteNotification = async (notificationId) => {
    var response = await Api.PostWithAuth(
      "/deleteNotification",
      { notificationId },
      context
    );
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
            <p>${user.profile.balance}</p>
          </section>
          <section>
            <p>Daily budget</p>
            <p>${user.profile.dailyBudget}</p>
          </section>
        </section>
      </section>

      {/* Container for Daily Notifications */}
      <p className="label">Daily Notifications</p>
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
      <p className="label">Purchase History</p>
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
