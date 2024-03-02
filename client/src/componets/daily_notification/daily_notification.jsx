import classes from "./daily_notificaiton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function DailyNotification({ notificationId, title, body, time }) {
  const creationTime = new Date(time);
  const currentTime = new Date();
  const timeDifference = currentTime - creationTime;
  const seconds = Math.floor(timeDifference / 1000);

  let timeValue, timeUnit;
  if (seconds < 60) {
    timeValue = seconds;
    timeUnit = 's';
  } else if (seconds < 3600) {
    timeValue = Math.floor(seconds / 60);
    timeUnit = 'm';
  } else {
    timeValue = Math.floor(seconds / 3600);
    timeUnit = 'h';
  }
  var printTime = `${timeValue}${timeUnit}`

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
        <p className="label">{printTime}</p>
      </div>
    </div>
  );
}

export default DailyNotification;
