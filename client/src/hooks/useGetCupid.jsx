import { useState } from "react";
import usePost from "./usePost";
import { useEffect } from "react";
import Api from "./api";

function useGetCupid(cupidId, context) {
  const [cupid, setCupid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cupid = await Api.PostWithAuth("/cupids/get", { cupidId }, context);
      setCupid(cupid);
    };

    fetchData();
  }, [cupidId]);

  return { cupid, setCupid };
}

export default useGetCupid;
