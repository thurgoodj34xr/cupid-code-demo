import classes from "./ai_chat.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";

function AiChat() {
  const context = useContext(AppContext);
  return (
    <section>
      <Navbar title="Ai Chat"></Navbar>
    </section>
  );
}

export default AiChat;
