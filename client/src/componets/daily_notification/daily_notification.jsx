import classes from "./daily_notificaiton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
function DailyNotification({ title, body, time }) {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className={classes.right}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </div>
        <p className="label">{time}</p>
      </div>
    </div>
  );
}

export default DailyNotification;
