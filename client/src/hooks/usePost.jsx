import { useState, useEffect } from "react";
import Api from "./api";
import useContext from "./context";

const usePost = (url, body, auth = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const context = useContext();
  useEffect(() => {
    const fetch = async () => {
      if (auth) {
        const resp = await Api.PostWithAuth(url, body, context);
        if (resp.error) {
          setError(resp.error);
          context.sendNotification(resp.error);
        } else {
          setData(resp);
        }
      } else {
        const resp = await Api.Post(url, body);
        if (resp.error) {
          setError(resp.error);
          context.sendNotification(resp.error);
        } else {
          setData(resp);
        }
      }
    };
    fetch();
  }, [url]);

  return { data, setData, error, rePost: usePost };
};

export default usePost;
