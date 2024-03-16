import CupidTile from "../../componets/cupid_tile/cupid_tile";
import HireCupid from "../../hooks/hireCupid";
import useGet from "../../hooks/useGet";
import classes from "./select_cupid.module.css";
import { useState } from "react";
import useInit from "../../hooks/useInit";
import useContext from "../../hooks/context";
import useGetCupid from "../../hooks/useGetCupid";

function SelectCupid() {
  const { user, setUser, navigate } = useInit();
  const context = useContext();
  const { data: cupids, error } = useGet("/cupids/all");
  const { cupid: currentCupid } = useGetCupid(
    user.profile.selectedCupid,
    context
  );

  const handleHireCupid = async (cupid) => {
    const response = await HireCupid(cupid, context);
    if (!response.error) {
      // Filter out the notification with the specified ID
      user.profile.selectedCupid = cupid.id;
      user.profile.pickedCupid = cupid;
      console.log(cupid);
      setUser((old) => ({
        ...old,
        profile: {
          ...old.profile,
          selectedCupid: cupid.cupid.id,
        },
      }));
      context.updateUser(user);
    }
  };

  return (
    <section className={classes.main}>
      <p className="label left">Current Cupid</p>
      {currentCupid && (
        <CupidTile
          key={currentCupid.id}
          cupid={currentCupid}
          onFire={() => {}}
          link="Fire"
        />
      )}
      <p className="label left">Available cupids</p>
      {cupids &&
        cupids.map((cupid, idx) => {
          return (
            <CupidTile
              key={idx}
              cupid={cupid}
              onFire={() => handleHireCupid(cupid)}
              link="Hire"
            />
          );
        })}
    </section>
  );
}

export default SelectCupid;
