import classes from "./text_area.module.css";

function TextArea({ placeholder, state, setState }) {
  return (
    <div className={classes.container}>
      <textarea
        className={classes.txt}
        cols="30"
        rows="5"
        placeholder={placeholder}
        onChange={(v) => setState(v.target.value)}
        value={state}
      ></textarea>
    </div>
  );
}

export default TextArea;
