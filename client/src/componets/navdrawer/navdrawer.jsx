import classes from "./navdrawer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AppContext from "../../componets/app_context";

function NavDrawer({ onExit }) {
  const context = useContext(AppContext);
  const [c, setC] = useState(`${classes.modal} ${classes.slideRight}`);
  const user = context.getUser();
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
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    context.updateUser(null);
    context.updateTokens(null);
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
