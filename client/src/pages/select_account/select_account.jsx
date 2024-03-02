import classes from "./select_account.module.css";
import { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Button from "../../componets/button/button";
import AppContext from "../../componets/app_context";

function SelectAccount() {
  let navigate = useNavigate();
  const context = useContext(AppContext);
  const [selectUser, setSelectUser] = useState(true);

  useEffect(() => {
    context.setAccountType("Standard");
  }, []);

  const back = () => {
    navigate("/"); // syntax for navigating to a different page
  };

  const setUser = () => {
    setSelectUser(true);
    context.setAccountType("Standard");
  };

  const setCupid = () => {
    setSelectUser(false);
    context.setAccountType("Cupid");
  };

  const handleButton = () => {
    navigate("/signUp");
  };

  return (
    <section className={classes.container}>
      <div className={classes.icon}>
        <FontAwesomeIcon
          onClick={back}
          className="left pointer"
          icon={faAngleLeft}
          size="2xl"
        />
      </div>
      <h1>Type</h1>
      <p className="label">
        Select the type of account that you would like to create
      </p>
      <div className={classes.select}>
        <p onClick={setUser} className={selectUser ? classes.type : ""}>
          Standard
        </p>
        <p>|</p>
        <p onClick={setCupid} className={selectUser ? "" : classes.type}>
          Cupid
        </p>
      </div>
      <Button onClickFunc={handleButton} text="Create Account" />
    </section>
  );
}

export default SelectAccount;
