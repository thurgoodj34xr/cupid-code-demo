import classes from "./select_cupid.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import * as Api from "../../hook/api";

function SelectCupid() {
  const context = useContext(AppContext);
  const [cupids, setCupids] = useState([]);

  const getCupids = async () => {
    const { cupids } = await Api.GetWithAuth("/cupids", context);
    console.log(cupids);
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
