import classes from "./ai_chat.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";
import { Navigate } from "react-router-dom";

function AiChat() {
  const context = useContext(AppContext);
  const navigate = Navigate();

  const home = () => {
    navigate("/home");
  };
  return (
    <section>
      <Navbar title="Ai Chat"></Navbar>
    </section>
  );
}

export default AiChat;
