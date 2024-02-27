import classes from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../app_context";
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

function Navbar({ title }) {
  const context = useContext(AppContext);
  const [c, setC] = useState(`${classes.hide}`);
  const user = context.getUser();
  let navigate = useNavigate();

  const showNavBar = () => {
    setC(`${classes.modal} ${classes.slideRight}`);
  };

  const hideNavBar = () => {
    setC(`${classes.modal} ${classes.slideLeft}`);
    setTimeout(() => {
      setC(`${classes.hide}`);
    }, 500);
  };

  const signout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/");
    context.updateUser(null);
    context.updateTokens(null);
  };

  const home = () => {
    navigate("/Home");
    hideNavBar();
  };

  const aiAssistance = () => {
    navigate("/AiAssistance");
    hideNavBar();
  };

  const aiChat = () => {
    navigate("/AiChat");
    hideNavBar();
  };

  const selectCupid = () => {
    navigate("/SelectCupid");
    hideNavBar();
  };

  const myAccount = () => {
    navigate("/MyAccount");
    hideNavBar();
  };

  const cupidCash = () => {
    navigate("/CupidCash");
    hideNavBar();
  };

  const purchases = () => {
    navigate("/Purchases");
    hideNavBar();
  };

  return (
    <>
      <div className={classes.main}>
        <h2>{title}</h2>
        <FontAwesomeIcon
          icon={faBars}
          className={classes.pointer}
          size="2xl"
          onClick={showNavBar}
        />
      </div>
      <section className={c}>
        {/* Exit Icon */}
        <section className={classes.exit}>
          <div onClick={hideNavBar}>
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
    </>
  );
}
export default Navbar;
