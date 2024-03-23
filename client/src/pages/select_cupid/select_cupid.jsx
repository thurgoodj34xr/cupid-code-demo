import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CupidTile from "../../componets/cupid_tile/cupid_tile";
import useContext from "../../hooks/context";
import { useApi } from "../../hooks/useApi";
import useInit from "../../hooks/useInit";
import { useSelector } from "react-redux";

function SelectCupid() {
  const queryClient = useQueryClient();
  const api = useApi();
  const socket = useContext().Socket();
  const { setUser, navigate } = useInit();
  const context = useContext();
  const { user } = useSelector((state) => state.auth);

  const { data: myCupid } = useQuery({
    queryFn: async () => {
      const resp = await api.get(`/cupids/me/${user.profile.id}`);
      if (resp.error) {
        return null;
      } else {
        return resp;
      }
    },
    queryKey: ["myCupid"],
  });

  const { mutateAsync: fireCupid } = useMutation({
    mutationFn: async (cupidId) => await api.post("/cupids/fire", { cupidId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myCupid", "cupids"]);
    },
  });

  const { mutateAsync: render } = useMutation({
    mutationFn: () => { },
    onSuccess: () => {
      queryClient.invalidateQueries(["myCupid", "cupids"]);
    },
  });

  const { data: cupids } = useQuery({
    queryFn: async () => await api.get(`/cupids/avaliable`),
    queryKey: ["cupids"],
  });

  const { mutateAsync: hireCupid } = useMutation({
    mutationFn: async (cupidId) =>
      await api.post("/cupids/hire", { profileId: user.profile.id, cupidId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cupids", "myCupid"]);
    },
  });

  useEffect(() => {
    const callback = () => {
      render();
    };
    socket.on("cupidStatus", callback);
    socket.emit("cupidStatus");
    return () => {
      socket.off("cupidStatus", callback);
    };
  }, []);

  return (
    <section className="flex flex-col w-full overflow-y-auto gap-5">
      <p className="label left">Current Cupid</p>
      {myCupid && (
        <CupidTile cupid={myCupid} onClick={() => fireCupid(myCupid.id)} />
      )}
      <p className="label left">Available cupids</p>
      {cupids &&
        cupids?.map((cupid, idx) => {
          if (cupid.id == myCupid?.id) return;
          return (
            <CupidTile
              key={cupid.id}
              cupid={cupid}
              onClick={() => hireCupid(cupid.id)}
              link="Hire"
            />
          );
        })}
      {cupids?.length == 0 && <p>No cupids available</p>}
    </section>
  );
}

export default SelectCupid;
