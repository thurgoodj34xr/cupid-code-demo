import classes from "./daily_notificaiton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { calculateTimeSince } from "../../../../utils/calculateTimeSince.js"
import { useState } from "react";

function DailyNotification({ notificationId, title, body, time, onDelete }) {
  const [c, setC] = useState('');
  var printTime = calculateTimeSince(time)

  const handleDeleteClick = () => {
    setC(classes.delete)
    setTimeout(() => {
      onDelete(notificationId);
    }, 1000)
  };

  return (
    <div className={`${classes.container} ${c}`}>
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
