import classes from "./my_account.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";

function MyAccount() {
  const context = useContext(AppContext);
  const { firstName, lastName, email, profile } = context.getUser();
  return (
    <section>
      <p>First:{firstName}</p>
      <p>Last:{lastName}</p>
      <p>Email:{email}</p>
    </section>
  );
}

export default MyAccount;
