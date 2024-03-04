import classes from "./purchase_tile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function PurchaseTile({ title, amount, icon, time }) {
  return (
    <section className={classes.container}>
      <div className={classes.row}>
        <div>{icon}</div>
        <div className="left">
          <h3>{title}</h3>
          <p className="label">${amount}</p>
        </div>
      </div>
      <div className={classes.right}>
        <FontAwesomeIcon
          className={classes.pointer}
          icon={faChevronRight}
          size="lg"
        />
        <div className={classes.icon}></div>
        <p className="label">{time}</p>
      </div>
    </section>
  );
}

export default PurchaseTile;
