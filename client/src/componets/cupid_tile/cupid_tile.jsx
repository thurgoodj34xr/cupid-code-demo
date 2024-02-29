import classes from "./cupid_tile.module.css";
import { useEffect, useState } from "react";

function CupidTile({ name, distance, onFire }) {
  return (
    <section className={classes.container}>
      <div>
        <h2>{name}</h2>
        <p className="label">{distance}</p>
      </div>
      <div>
        <p className="pointer" onClick={onFire}>
          Fire
        </p>
      </div>
    </section>
  );
}

export default CupidTile;
