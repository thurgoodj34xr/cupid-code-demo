import React, { useState, useEffect } from 'react';
import PhotoCircle from "../photo_circle/photo_circle";
import { retrieveDistance } from "../../utils/retrieveDistance";

function CupidTile({ cupid, link = "Fire", onClick, user }) {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const distanceResp = await retrieveDistance(
          cupid.latitude,
          cupid.longitude,
          user.profile.latitude,
          user.profile.longitude
        );
        setDistance(distanceResp.data.routes.car.distance.text);
      } catch (error) {
        console.error('Error fetching distance:', error);
        setDistance('Error');
      }
    };
    fetchDistance();
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
