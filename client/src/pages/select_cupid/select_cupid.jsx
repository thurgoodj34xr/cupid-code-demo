import { useState } from "react";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import useContext from "../../hooks/context";
import HireCupid from "../../hooks/hireCupid";
import useGet from "../../hooks/useGet";
import useGetCupid from "../../hooks/useGetCupid";
import useInit from "../../hooks/useInit";
import FireCupid from "../../hooks/fireCupid";

function SelectCupid() {
  const { user, setUser, navigate } = useInit();
  const context = useContext();
  const { data: cupids, error } = useGet("/cupids/all");
  const [runHook, setRunHook] = useState({});
  const { cupid: currentCupid } = useGetCupid(
    user.profile.id,
    context,
    runHook
  );

  const handleHireCupid = async (cupid) => {
    const newCupid = await HireCupid(user.profile.id, cupid.id, context);
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

  const handleFireCupid = async () => {
    const resp = await FireCupid(user.profile.id, context);
    if (!resp.error) {
      setUser((old) => ({
        ...old,
        profile: {
          ...old.profile,
          cupidId: null,
          cupid: null,
        },
      }));
      setRunHook({});
      context.updateUser(user);
    }
  };

  return (
    <section className="flex flex-col w-full overflow-y-auto gap-5">
      <p className="label left">Current Cupid</p>
      {currentCupid && (
        <CupidTile
          key={currentCupid.id}
          cupid={currentCupid}
          link="Fire"
          onClick={handleFireCupid}
        />
      )}
      <p className="label left">Available cupids</p>
      {cupids &&
        cupids.map((cupid, idx) => {
          return (
            <CupidTile
              key={idx}
              cupid={cupid}
              onClick={() => {
                handleHireCupid(cupid);
              }}
              link={currentCupid ? "" : "Hire"}
            />
          );
        })}
    </section>
  );
}

export default SelectCupid;
