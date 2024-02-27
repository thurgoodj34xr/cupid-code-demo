import classes from "./ai_chat.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";
import { useNavigate } from "react-router-dom";

function AiChat() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const home = () => {
    navigate("/home");
  };
  return <div></div>;
}

export default AiChat;
