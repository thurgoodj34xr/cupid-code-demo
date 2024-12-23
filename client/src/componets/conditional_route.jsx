import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "./../hooks/api";
import AppContext from "./app_context";
import { useDispatch } from "react-redux";
import { login } from "../store/auth_slice";

{
  /* 
  This is a conditional componet to control routing. 
  If the condition is true, it will allow the router 
  navigate to the given end point. If the condition is false,
  it will redirect the user to the provided route.
  */
}

export function ConditionalRoute({ componetToRender, role, route }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate(); // move this into the function
  const context = useContext(AppContext);
  const location = useLocation();
  const dispatch = useDispatch();
  const socket = context.Socket();

  const Validate = async () => {
    // Validate that the user has a vaid token
    const token = localStorage.getItem("token");
    const resp = await Api.Post("/token/verify", {
      token,
    });
    if (!resp.user) {
      localStorage.removeItem("token");
      context.sendNotification("Token Expired");
      navigate("/");
      return "";
    }
    dispatch(login({ user: resp.user, token: resp.tokens.accessToken }));
    context.updateUser(resp.user);
    context.updateTokens(resp.tokens);

    // Check if user has the correct role
    if (role && resp.user.role != role) {
      context.sendNotification("ACCESS DENIED!!!! REROUTING TO HOME PAGE");
      context.Socket().emit("log", {
        file: "conditional_route",
        message: `tried to access ${location.pathname} [${role}]`,
        user: `${resp.user.email} [${resp.user.role}]`,
      });

      navigate(route);
    }
    setLoading(false);
  };

  useEffect(() => {
    Validate();
  }, [componetToRender]);

  return loading ? "" : componetToRender;
}

export default ConditionalRoute;
