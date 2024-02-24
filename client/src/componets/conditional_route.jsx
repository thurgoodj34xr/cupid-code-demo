import { Navigate } from "react-router-dom";

{
  /* 
    This is a conditional componet to control routing. 
    If the condition is true, it will allow the router 
    navigate to the given end point. If the condition is false,
    it will redirect the user to the provided route.
  */
}

export const ConditionalRoute = ({ condition, componetToRender, route }) => {
  return condition ? componetToRender : <Navigate to={route} replace />;
};
