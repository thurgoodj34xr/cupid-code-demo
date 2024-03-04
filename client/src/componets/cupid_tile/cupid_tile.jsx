import classes from "./cupid_tile.module.css";
import { useEffect, useState } from "react";

function CupidTile({ name, photoCircle, distance, onFire, link = "Fire" }) {
  return (
    <section className="flex row space between bg-white p-20 br ycenter">
      <div className="flex row ycenter g-20 left">
        {photoCircle}
        <div className="flex col">
          <h2>{name}</h2>
          <p className="label">{distance}</p>
        </div>
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
