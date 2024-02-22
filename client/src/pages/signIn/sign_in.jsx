import { useState, useEffect } from "react";
import styles from "./sign_in.module.css";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";
import { useNavigate } from "react-router-dom";

export default function SignIn({ setuser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 13) {
        handleSignIn(email, password);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);

  async function handleSignIn({ userFunc }) {
    const res = await fetch("/signin", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((resp) => resp.json());
    if (res.error) {
      setError(res.error);
    } else {
      setuser(res);
      navigate("/home");
    }
  }

  const signUp = () => {
    navigate("/sign_up");
  };

  return (
    <div className={`${styles.sign_in}`}>
      <h1>Log In</h1>
      {error && <p className="error">{error}</p>}
      <Input
        inputType="email"
        text="Email"
        placeholder="Enter Email"
        onChangeFunc={(email) => setEmail(email)}
      />
      <Input
        text="Password"
        inputType="password"
        placeholder="Enter Password"
        onChangeFunc={(p) => setPassword(p)}
      />
      <p onClick={signUp}>Dont have an account? Sign up</p>
      <Button text="Log In" onClickFunc={handleSignIn}></Button>
    </div>
  );
}
