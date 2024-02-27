import { useEffect, useState, useContext } from "react";
import classes from "./notification.module.css";
import AppContext from "../../componets/app_context";

export default function Notification() {
  const context = useContext(AppContext);
  const text = context.getNotification();

  if (text) {
    return (
      <div className={classes.notification}>
        <span>{text}</span>
      </div>
    );
  }
  return "";
}
