import classes from "./purchases.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";

function Purchases() {
  const context = useContext(AppContext);
  return (
    <section>
      <Navbar title="Purchases"></Navbar>
    </section>
  );
}

export default Purchases;
