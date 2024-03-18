import { useState } from "react";
import usePost from "./usePost";
import { useEffect } from "react";
import Api from "./api";

function useGetCupid(profileId, context, runHook) {
  const [cupid, setCupid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { cupid } = await Api.PostWithAuth(
        "/hireCupid/cupid",
        { profileId },
        context
      );
      setCupid(cupid);
    };

    if (profileId) {
      fetchData();
    } else {
      setCupid(null);
    }
  }, [profileId, runHook]);

  return { cupid, setCupid };
}

export default useGetCupid;
