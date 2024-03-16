import { useNavigate } from "react-router-dom";
import useContext from "./context";
import { useState } from "react";

const useInit = () => {
  const [user, setUser] = useState(useContext().getUser());
  const navigate = useNavigate();
  return { user, setUser, navigate };
};
export default useInit;
