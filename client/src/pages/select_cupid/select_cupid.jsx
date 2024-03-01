import classes from "./select_cupid.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";
import CupidTile from "../../componets/cupid_tile/cupid_tile";

function SelectCupid() {
  const context = useContext(AppContext);
  return (
    <section className={classes.main}>
      <p className="label left">Avaliable cupids</p>
      <CupidTile name="Jake" distance="5 mi" link="Hire" />
      <CupidTile name="John" distance="10 mi" link="Hire" />
      <CupidTile name="David" distance="14 mi" link="Hire" />
      <CupidTile name="Cole" distance="18 mi" link="Hire" />
    </section>
  );
}

export default SelectCupid;
