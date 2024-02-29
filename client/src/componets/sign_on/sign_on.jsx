import classes from "./sign_on.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignOn({ icon, text, ricon }) {
  return (
    <div className={`${classes.signOn} ${classes.pointer}`}>
      {icon ? <FontAwesomeIcon icon={icon} size="2xl" /> : ricon}
      <p>{text}</p>
    </div>
  );
}

export default SignOn;
