import Navbar from "../../componets/navbar/navbar";
import classes from "./home.module.css";
import DailyNotification from "../../componets/daily_notification/daily_notification";

function Home() {

    return (
        <section className={classes.container}>
            {/* Navigation Bar */}
            <Navbar title="Home"></Navbar>

            {/* Container for Budget */}
            <section className={classes.budget}>
                <h2>Good Morning,</h2>
                <p className="label">Summary of your budget</p>
                <hr />
                <section className={classes.balance}>
                    <section>
                        <p>Balance</p>
                        <p>$65.32</p>
                    </section>
                    <section>
                        <p>Daily budget</p>
                        <p>$25</p>
                    </section>
                </section>
            </section>

            {/* Container for Daily Notifications */}
            <p className="label">Daily Notifications</p>
            <DailyNotification title="Be Yourself" body="Authenticity is attractive. Don't try to be someone you're not just to.." />
            <DailyNotification title="Smell Good" body="Take a moment in your morning routine to put on some..." />
        </section>
    )
}

export default Home;