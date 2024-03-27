import React, { useState, useEffect } from 'react';
import PhotoCircle from "../photo_circle/photo_circle";
import { calculateDistanceCupidStandard } from '../../utils/calculateDistance';

function CupidTile({ cupid, link = "Fire", onClick, user }) {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    calculateDistanceCupidStandard(cupid.latitude,
      cupid.longitude,
      user.profile.latitude,
      user.profile.longitude,
      setDistance)
  }, []);

  return (
    <section className="flex row space between bg-white p-20 br ycenter">
      <div className="flex row ycenter g-20 left">
        {<PhotoCircle url={cupid.user.photoUrl} size="100px" />}
        <div className="flex col">
          <h2>
            {cupid.user.firstName} {cupid.user.lastName}
          </h2>
          <p className="label">{distance !== null ? distance : 'Calculating distance...'}</p>
        </div>
      </div>
      <div>
        <p className="pointer" onClick={onClick}>
          {link}
        </p>
      </div>
    </section>
  );
}

export default CupidTile;
