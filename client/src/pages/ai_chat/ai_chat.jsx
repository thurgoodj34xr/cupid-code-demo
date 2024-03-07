import { useNavigate } from "react-router-dom";
import useContext from "../../hooks/context";

function AiChat() {
  const context = useContext();
  const navigate = useNavigate();

  const home = () => {
    navigate("/home");
  };
  return <div></div>;
}

export default AiChat;
