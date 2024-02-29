import classes from "./purchase_tile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function PurchaseTile({ icon, time }) {
  return (
    <section className={classes.container}>
      <div className={classes.row}>
        <div>{icon}</div>
        <div>
          <h2>Movies</h2>
          <p className="label">$23.70</p>
        </div>
      </div>
      <div className={classes.right}>
        <FontAwesomeIcon icon={faChevronRight} size="lg" />
        <div className={classes.icon}></div>
        <p className="label">{time}</p>
      </div>
    </section>
  );
}

export default PurchaseTile;
