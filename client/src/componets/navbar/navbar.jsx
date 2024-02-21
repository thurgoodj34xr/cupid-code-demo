import classes from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import NavDrawer from "../navdrawer/navdrawer";


function Navbar({ title }) {
    return (
        <>
            <NavDrawer show={true} />
            <div className={classes.main}>
                <h2>{title}</h2>
                <FontAwesomeIcon icon={faBars} size="2xl" />
            </div>
        </>
    )
}
export default Navbar;