import AppContext from "./app_context";
import * as Api from "./../hook/api";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

{
  /* 
  This is a conditional componet to control routing. 
  If the condition is true, it will allow the router 
  navigate to the given end point. If the condition is false,
  it will redirect the user to the provided route.
  */
}

export function ConditionalRoute({ componetToRender, role }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate(); // move this into the function
  const context = useContext(AppContext);

  const SigninWithToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const resp = await Api.Post("/token/verify", {
      token,
    });
    if (!resp.user) {
      localStorage.removeItem("token");
      context.sendNotification("Token Expired");
      navigate("/");
      return "";
    }

    context.updateUser(resp.user);
    context.updateTokens(resp.tokens);
    // Check if user has the correct role
    if (role && resp.user.role != role) {
      /*
        If they dont, navigate to the home page.
        In the future, need to create a access denied page.
      */
      navigate("/");
      context.sendNotification("ACCESS DENIED! REDIRECTING TO HOME PAGE");
      return "";
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    SigninWithToken();
  }, [componetToRender]);

  return loading ? "" : componetToRender;
}
