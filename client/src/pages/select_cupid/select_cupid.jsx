import classes from "./select_cupid.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import * as Api from "../../hook/api";
import PhotoCircle from "../../componets/photo_circle/photo_circle";

function SelectCupid() {
  const context = useContext(AppContext);
  const [cupids, setCupids] = useState([]);

  const getCupids = async () => {
    const { cupids } = await Api.GetWithAuth("/cupids", context);
    setCupids(cupids);
  };

  useEffect(() => {
    getCupids();
  }, []);
  return (
    <section className={classes.main}>
      <p className="label left">Avaliable cupids</p>
      {cupids &&
        cupids.map((cupid, idx) => {
          console.log(cupid.photoUrl);
          return (
            <CupidTile
              key={idx}
              photoCircle={<PhotoCircle url={cupid.photoUrl} size="100px" />}
              name={`${cupid.firstName} ${cupid.lastName}`}
              distance="5 mi"
              link="Hire"
            />
          );
        })}
    </section>
  );
}

export default SelectCupid;
