import PhotoCircle from "../photo_circle/photo_circle";
import classes from "./cupid_tile.module.css";
import { useEffect, useState } from "react";

function CupidTile({ cupid, onFire, link = "Fire" }) {
  const handleCupidHire = () => {
    setTimeout(() => {
      onFire(cupid);
    }, 1000);
  };
  return (
    <section className="flex row space between bg-white p-20 br ycenter">
      <div className="flex row ycenter g-20 left">
        {<PhotoCircle url={cupid.photoUrl} size="100px" />}
        <div className="flex col">
          <h2>
            {cupid.firstName} {cupid.lastName}
          </h2>
          <p className="label">5 Mile</p>
        </div>
      </div>
      <div>
        <p className="pointer" onClick={handleCupidHire}>
          {link}
        </p>
      </div>
    </section>
  );
}

export default CupidTile;
