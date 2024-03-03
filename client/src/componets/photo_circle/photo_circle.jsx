import classes from "./photo_circle.module.css";

function PhotoCircle({ url, size = "120px" }) {
  return (
    <span className={classes.profilePhoto}>
      <img src={url} width={size} height={size} />
    </span>
  );
}

export default PhotoCircle;
