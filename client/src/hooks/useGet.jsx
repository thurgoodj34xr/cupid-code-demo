import { useEffect, useState } from "react";
import Api from "./api";
import useContext from "./context";

const useGet = (route, auth = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const context = useContext();

  useEffect(() => {
    const cupids = async () => {
      if (auth) {
        const resp = await Api.GetWithAuth(route, context);
        if (resp.error) {
          setError(resp.error);
        } else {
          setData(resp);
        }
      } else {
        const resp = await Api.Get(route);
        if (resp.error) {
          setError(resp.error);
        } else {
          setData(resp);
        }
      }
    };
    cupids();
  }, [route]);
  return { data, setData, error, reGet: useGet };
};

export default useGet;
