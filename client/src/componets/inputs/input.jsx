import { useState, useEffect } from "react";
import classes from "./inputs.module.css";

export default function Input({
  text,
  placeholder,
  validationFunc,
  inputType = "text",
  state,
  setState,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 13) {
        setinputV("");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]);

  function handleChange(e) {
    if (validationFunc) {
      setState(validationFunc(e.target.value));
    } else {
      setState(e.target.value);
    }
  }

  return (
    <div className={classes.inputV}>
      <label htmlFor="">{text}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        onChange={handleChange}
        value={state}
      />
    </div>
  );
}
