import classes from "./ai_assistance.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import DailyNotification from "../../componets/daily_notification/daily_notification";
import PurchaseTile from "../../componets/purchase_tile/purchase_tile";
import { FaGoodreads, FaTicketAlt } from "react-icons/fa";
import Button from "../../componets/button/button";
import { useNavigate } from "react-router-dom";

function AiAssistance() {
  const context = useContext(AppContext);
  let navigate = useNavigate();

  const purchases = () => {
    navigate("/Purchases");
  };

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
      <DailyNotification
        title="Be Yourself"
        body="Authenticity is attractive. Don't try to be someone you're not just to.."
        time="2m"
      />
      <DailyNotification
        title="Smell Good"
        body="Take a moment in your morning routine to put on some..."
        time="5m"
      />
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
