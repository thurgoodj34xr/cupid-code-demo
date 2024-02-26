import classes from "./ai_assistance.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";

function AiAssistance() {
  const context = useContext(AppContext);
  return (
    <section>
      <Navbar title="Ai Assistance"></Navbar>
    </section>
  );
}

export default AiAssistance;
