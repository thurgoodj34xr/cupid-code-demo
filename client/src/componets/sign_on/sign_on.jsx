import classes from "./sign_on.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignOn({ icon, text }) {
  return (
    <div className={classes.signOn}>
      <FontAwesomeIcon icon={icon} size="2xl" />
      <p>{text}</p>
    </div>
  );
}

export default SignOn;
