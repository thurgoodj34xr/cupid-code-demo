import Navbar from "../../componets/navbar/navbar";
import classes from "./home.module.css";
import DailyNotification from "../../componets/daily_notification/daily_notification"
function Home() {
    return (

        <div className={classes.container}>

            {/* Navigation Bar */}
            <Navbar title="Home"></Navbar>

            {/* Container for Budget */}
            <div className={classes.budget}>
                <h2>Good Morning,</h2>
                <p className="label">Summary of your budget</p>
                <hr />
                <div className={classes.balance}>
                    <div>
                        <p>Balance</p>
                        <p>$65.32</p>
                    </div>
                    <div>
                        <p>Daily budget</p>
                        <p>$25</p>
                    </div>
                </div>
            </div>

            {/* Container for Daily Notifications */}
            <p className="label">Daily Notifications</p>
            <DailyNotification title="Be Yourself" body="Authenticity is attractive. Don't try to be someone you're not just to.." />
            <DailyNotification title="Smell Good" body="Take a moment in your morning routine to put on some..." />
        </div>

    )
}

export default Home;