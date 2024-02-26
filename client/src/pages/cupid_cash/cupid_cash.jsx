import classes from "./cupid_cash.module.css";
import Navbar from "../../componets/navbar/navbar";
import { useContext, useEffect } from "react";
import AppContext from "../../componets/app_context";

function CupidCash() {
  const context = useContext(AppContext);
  return (
    <section>
      <Navbar title="Cupid Cash"></Navbar>
    </section>
  );
}

export default CupidCash;
