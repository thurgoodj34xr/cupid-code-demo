import classes from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import NavDrawer from "../navdrawer/navdrawer";
import { useState } from "react";

function Navbar({ title }) {
  const [nav, setNav] = useState(false);

  const showNavBar = () => {
    setNav(true);
  };

  const hideNavBar = () => {
    setNav(false);
  };

  return (
    <>
      {nav && <NavDrawer className={classes.open} onExit={hideNavBar} />}
      <div className={classes.main}>
        <h2>{title}</h2>
        <FontAwesomeIcon
          icon={faBars}
          className={classes.pointer}
          size="2xl"
          onClick={showNavBar}
        />
      </div>
    </>
  );
}
export default Navbar;
