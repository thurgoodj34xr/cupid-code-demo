import classes from "./navdrawer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavDrawer({ user, onExit }) {
  const [c, setC] = useState(`${classes.modal} ${classes.slideRight}`);

  let navigate = useNavigate();

  const close = () => {
    setC(`${classes.modal} ${classes.slideLeft}`);
    setTimeout(() => {
      onExit();
    }, 500);
  };

  const home = () => {
    navigate("/home");
  };
  const signout = () => {
    navigate("/");
  };

  return (
    <section className={c}>
      <section className={classes.exit}>
        <div onClick={close}>
          <FontAwesomeIcon icon={faRightFromBracket} size="2xl" />
        </div>
      </section>
      <section className={classes.container}>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p className="label">{user.email}</p>
        <hr />
        <section className={classes.tile} onClick={home}>
          <div>
            <FontAwesomeIcon icon={faHouse} size="2xl" />
          </div>
          <h3>Home</h3>
        </section>
      </section>
      <section className={classes.tile} onClick={signout}>
        <div>
          <FontAwesomeIcon icon={faRightFromBracket} size="2xl" />
        </div>
        <h3>Log Out</h3>
      </section>
    </section>
  );
}

export default NavDrawer;
