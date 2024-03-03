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
