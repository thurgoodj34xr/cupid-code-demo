import classes from "./daily_notificaiton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { calculateTimeSince } from "../../../../utils/calculateTimeSince.js"

function DailyNotification({ notificationId, title, body, time, onDelete }) {
  var printTime = calculateTimeSince(time)

  const handleDeleteClick = () => {
    onDelete(notificationId);
  };

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      <div className={classes.right}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faChevronRight} size="lg" onClick={handleDeleteClick} />
        </div>
        <p className="label">{printTime}</p>
      </div>
    </div>
  );
}

export default DailyNotification;
