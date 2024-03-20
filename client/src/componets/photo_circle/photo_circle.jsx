import classes from "./photo_circle.module.css";

function PhotoCircle({ url, size = "120px" }) {
  return (
    <span className={classes.profilePhoto} style={{ width: size }}>
      <img src={url} style={{ width: size, height: size }} />
    </span>
  );
}

export default PhotoCircle;
