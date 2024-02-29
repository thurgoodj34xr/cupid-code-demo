import classes from "./text_area.module.css";
import { useEffect, useState } from "react";

function TextArea({ placeholder, onChangeFunc }) {
  const [text, setText] = useState();

  const handleChange = (e) => {
    setText(e.target.value);
    onChangeFunc(e.target.value);
  };

  return (
    <textarea
      name=""
      className={classes.txt}
      cols="30"
      rows="5"
      placeholder={placeholder}
      onChange={handleChange}
      value={text}
    ></textarea>
  );
}

export default TextArea;
