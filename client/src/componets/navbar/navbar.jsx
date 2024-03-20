import {
  faBars,
  faHandshake,
  faHouse,
  faMessage,
  faMoneyBill,
  faPaperPlane,
  faPeopleLine,
  faRightFromBracket,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  FaBook,
  FaHistory,
  FaKey,
  FaSearch,
  FaSubscript,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useContext from "../../hooks/context";
import PhotoCircle from "../photo_circle/photo_circle";
import classes from "./navbar.module.css";

function Navbar({ title }) {
  const [on, setOn] = useState(false);
  const [init, setInit] = useState(true);
  const context = useContext();
  const user = context.getUser();

  let navigate = useNavigate();

  const showNavBar = () => {
    setInit(false);
    setOn(true);
  };

  const hideNavBar = () => {
    setOn(false);
  };

  const signout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    context.Socket().emit("signOut", {
      file: "navbar.jsx",
      message: "signed out",
      user,
    });
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

  const changePassword = () => {
    navigate("ChangePassword");
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

  const avaliableJobs = () => {
    navigate("/AvaliableJobs");
    hideNavBar();
  };

  const jobHistory = () => {
    navigate("/JobHistory");
    hideNavBar();
  };

  const viewUsers = () => {
    navigate("/ViewUsers");
    hideNavBar();
  };

  const viewLogs = () => {
    navigate("/Logs");
    hideNavBar();
  };

  const viewJobs = () => {
    navigate("/Jobs");
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
      <section
        onClick={hideNavBar}
        className={
          init
            ? `${classes.hide}`
            : on
            ? `${classes.wrapper} ${classes.fadein}`
            : `${classes.wrapper} ${classes.fadeout}`
        }
      />
      <section
        className={
          init
            ? `${classes.hide}`
            : on
            ? `${classes.modal} ${classes.slideRight}`
            : `${classes.modal} ${classes.slideLeft}`
        }
      >
        {/* Exit Icon */}
        <section className={classes.exit}>
          <div onClick={hideNavBar}>
            <FontAwesomeIcon icon={faRightFromBracket} size="2xl" />
          </div>
        </section>
        {/* User Info */}
        <section className={classes.container}>
          <PhotoCircle url={user.photoUrl} />
          <section className="flex col g-10">
            <h2 className="center">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex row between">
              <p className="label">{user.email}</p>
              {user.profile && <p className="label">${user.profile.balance}</p>}
            </div>
          </section>
          <hr />
          {/* Home Icon */}
          <section className={classes.tile} onClick={home}>
            <div>
              <FontAwesomeIcon icon={faHouse} size="2xl" />
            </div>
            <h3>Home</h3>
          </section>
          {/* Jobs Icon */}
          <section className={classes.tile} onClick={viewJobs}>
            <div>
              <FontAwesomeIcon icon={faPaperPlane} size="2xl" />
            </div>
            <h3>Jobs</h3>
          </section>

          {/* ************* STANDARD ROLE ********************** */}

          {user.profile && (
            <>
              {/* Ai Assistance */}
              <section className={classes.tile} onClick={aiAssistance}>
                <div>
                  <FontAwesomeIcon icon={faHandshake} size="2xl" />
                </div>
                <h3>Ai Assistance</h3>
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
            </>
          )}
          {/* ***************** END OF STANDARD ROLE ***************** */}

          {/* ********************** CUPID ROLE *********************** */}
          {user.cupid && (
            <>
              <section className={classes.tile} onClick={avaliableJobs}>
                <div>
                  <FaSearch size="2rem" />
                </div>
                <h3>Avaliable Jobs</h3>
              </section>
              <section className={classes.tile} onClick={jobHistory}>
                <div>
                  <FaHistory size="2rem" />
                </div>
                <h3>Job History</h3>
              </section>
            </>
          )}
          {/* *************** END OF CUPID ROLE ************* */}

          {/* ****************** ADMIN ROLE ************************* */}
          {user.admin && (
            <>
              <section className={classes.tile} onClick={viewUsers}>
                <div>
                  <FaSearch size="2rem" />
                </div>
                <h3>View Users</h3>
              </section>
            </>
          )}
          {user.admin && (
            <>
              <section className={classes.tile} onClick={viewLogs}>
                <div>
                  <FaBook size="2rem" />
                </div>
                <h3>Logs</h3>
              </section>
            </>
          )}
          {/* ****************** END OF ADMIN ROLE *************** */}

          <hr />
          {/* My Account */}
          <section className={classes.tile} onClick={myAccount}>
            <div>
              <FontAwesomeIcon icon={faUser} size="2xl" />
            </div>
            <h3>My Account</h3>
          </section>
          <section className={classes.tile} onClick={changePassword}>
            <div>
              <FaKey size="2rem" />
            </div>
            <h3>Change Password</h3>
          </section>

          {/* **************** STANDARD ROLE*************** */}
          {user.profile && (
            <>
              {/* Add Cupid Cash */}
              <section className={classes.tile} onClick={cupidCash}>
                <div>
                  <FontAwesomeIcon icon={faMoneyBill} size="2xl" />
                </div>
                <h3>Add Cupid Cash</h3>
              </section>
              {/* Purchases */}
              <section className={classes.tile} onClick={purchases}>
                <div>
                  <FontAwesomeIcon icon={faShoppingCart} size="2xl" />
                </div>
                <h3>Purchases</h3>
              </section>
            </>
          )}
          {/* **************** END OF STANDARD ROLE*************** */}
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
