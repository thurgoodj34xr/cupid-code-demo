import { useEffect, useState } from "react";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import PhotoCircle from "../../componets/photo_circle/photo_circle";
import Api from "../../hook/api";
import classes from "./select_cupid.module.css";
import useContext from "../../hook/context";

function SelectCupid() {
  const context = useContext();
  const [cupids, setCupids] = useState([]);

  const getCupids = async () => {
    const { cupids } = await Api.GetWithAuth("/cupids/all", context);
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
