import { useState } from "react";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import useContext from "../../hooks/context";
import HireCupid from "../../hooks/hireCupid";
import useGet from "../../hooks/useGet";
import useGetCupid from "../../hooks/useGetCupid";
import useInit from "../../hooks/useInit";
import classes from "./select_cupid.module.css";

function SelectCupid() {
  const { user, setUser, navigate } = useInit();
  const context = useContext();
  const { data: cupids, error } = useGet("/cupids/all");
  const [runHook, setRunHook] = useState({});
  const { cupid: currentCupid } = useGetCupid(
    user.profile.cupidId,
    context,
    runHook
  );

  const handleHireCupid = async (cupid) => {
    const newCupid = await HireCupid(cupid, context);
    if (!cupid.error) {
      setUser((old) => ({
        ...old,
        profile: {
          ...old.profile,
          cupidId: newCupid.id,
        },
      }));
      setRunHook({});
      context.updateUser(user);
    }
  };

  return (
    <section className="flex flex-col w-full overflow-y-auto">
      <p className="label left">Current Cupid</p>
      {currentCupid && (
        <CupidTile
          key={currentCupid.id}
          cupid={currentCupid.user}
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
