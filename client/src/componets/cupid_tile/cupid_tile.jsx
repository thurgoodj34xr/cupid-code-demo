import classes from "./cupid_tile.module.css";
import { useEffect, useState } from "react";

function CupidTile({ name, distance, onFire, link = "Fire" }) {
  return (
    <section className={classes.container}>
      <div className="left">
        <h2>{name}</h2>
        <p className="label">{distance}</p>
      </div>
      <div>
        <p className="pointer" onClick={onFire}>
          {link}
        </p>
      </div>
    </section>
  );
}

export default CupidTile;
