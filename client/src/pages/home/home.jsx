import Navbar from "../../componets/navbar/navbar";
import classes from "./home.module.css";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import { useContext, useEffect } from "react";
import AppContext from "../../componets/app_context";

function Home() {
  const context = useContext(AppContext);
  const user = context.getUser();
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
      <DailyNotification
        title="Be Yourself"
        body="Authenticity is attractive. Don't try to be someone you're not just to.."
        time="2m"
      />
      <DailyNotification
        title="Smell Good"
        body="Take a moment in your morning routine to put on some..."
        time="4m"
      />
    </section>
  );
}

export default Home;
