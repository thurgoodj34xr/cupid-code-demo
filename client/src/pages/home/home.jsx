import Navbar from "../../componets/navbar/navbar";
import classes from "./home.module.css";
import * as Api from "../../hook/api";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import { useEffect, useState, useContext } from "react";
import AppContext from "../../componets/app_context";

function Home() {
  const context = useContext(AppContext);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const user = context.getUser();

  async function getNotificationHistory() {
    const userId = user.id;
    var response = await Api.PostWithAuth(
      "/getNotificationHistory",
      { userId },
      context
    );
    setNotificationHistory(response.notifications)
    console.log(response.notifications[0])
  }
  useEffect(() => {
    getNotificationHistory();

    return () => {
    };
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
        <DailyNotification key={notification.id}
          title={notification.title}
          body={notification.message}
          time={notification.timeStamp}
        />
      ))}
    </section>
  );
}

export default Home;
