import classes from "./navdrawer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faHandshake,
  faMessage,
  faMoneyBill,
  faShoppingCart,
  faUser,
  faPeopleLine,
} from "@fortawesome/free-solid-svg-icons";
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

  const signout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    context.updateUser(null);
    context.updateTokens(null);
  };

  const home = () => {
    navigate("/home");
  };

  const aiAssistance = () => {
    navigate("/aiAssistance");
  };

  const aiChat = () => {
    navigate("/aiChat");
  };

  const selectCupid = () => {
    navigate("/selectCupid");
  };

  const myAccount = () => {
    navigate("/myAccount");
  };

  const cupidCash = () => {
    navigate("/cupidCash");
  };

  const purchases = () => {
    navigate("/purchases");
  };

  return (
    <section className={c}>
      {/* Exit Icon */}
      <section className={classes.exit}>
        <div onClick={close}>
          <FontAwesomeIcon icon={faRightFromBracket} size="2xl" />
        </div>
      </section>
      {/* User Info */}
      <section className={classes.container}>
        <section className={classes.profile}>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p className="label">{user.email}</p>
        </section>
        <hr />
        {/* Home Icon */}
        <section className={classes.tile} onClick={home}>
          <div>
            <FontAwesomeIcon icon={faHouse} size="2xl" />
          </div>
          <h3>Home</h3>
        </section>
        {/* Ai Assistance Icon */}
        <section className={classes.tile} onClick={aiAssistance}>
          <div>
            <FontAwesomeIcon icon={faHandshake} size="2xl" />
          </div>
          <h3>Ai Assistancee</h3>
        </section>
        {/* Ai Chat */}
        <section className={classes.tile} onClick={aiChat}>
          <div>
            <FontAwesomeIcon icon={faMessage} size="2xl" />
          </div>
          <h3>Ai Chat</h3>
        </section>
        {/* Select Cupid */}
        <section className={classes.tile} onClick={selectCupid}>
          <div>
            <FontAwesomeIcon icon={faPeopleLine} size="2xl" />
          </div>
          <h3>Select Cupid</h3>
        </section>
        <hr />
        {/* My Account */}
        <section className={classes.tile} onClick={myAccount}>
          <div>
            <FontAwesomeIcon icon={faUser} size="2xl" />
          </div>
          <h3>My Account</h3>
        </section>
        {/* Add Cupid Cash */}
        <section className={classes.tile} onClick={cupidCash}>
          <div>
            <FontAwesomeIcon icon={faMoneyBill} size="2xl" />
          </div>
          <h3>Add cupid Cash</h3>
        </section>
        {/* Purchases */}
        <section className={classes.tile} onClick={purchases}>
          <div>
            <FontAwesomeIcon icon={faShoppingCart} size="2xl" />
          </div>
          <h3>Purchases</h3>
        </section>
      </section>
      {/* Sign */}
      <hr />
      <section
        className={`${classes.tile} ${classes.signOut}`}
        onClick={signout}
      >
        <div>
          <FontAwesomeIcon icon={faRightFromBracket} size="2xl" />
        </div>
        <h3>Log Out</h3>
      </section>
    </section>
  );
}

export default NavDrawer;
