import { useState, useEffect, useContext } from "react";
import classes from "./sign_in.module.css";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";
import { useNavigate } from "react-router-dom";
import AppContext from "../../componets/app_context";
import * as Api from "../../hook/api";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const context = useContext(AppContext);

  let navigate = useNavigate();

  const SigninWithToken = async () => {
    const refreshToken = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (!refreshToken || !id) return;
    const resp = await Api.Post("/signinwithtoken", {
      refreshToken,
      id,
    });

    if (!resp.user) return;
    context.updateUser(resp.user);
    context.updateTokens(resp.tokens);
    navigate("/home");
  };

  useEffect(() => {
    SigninWithToken();
  }, []);

  {
    /* Enables a user to use the enter key instead of clicking on submit */
  }
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

  {
    /* After a user has entered their email and password and has submited the login, this function will handle the logic */
  }
  const handleSignIn = async () => {
    const res = await Api.Post("/signin", {
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    }

    context.updateUser(res.user);
    context.updateTokens(res.tokens);
    navigate("/home");
  };

  const signUp = () => {
    navigate("/sign_up");
  };

  return (
    <div className={classes.sign_in}>
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
      <p onClick={signUp}>
        Dont have an account? <span className="pointer">Sign up</span>
      </p>
      <Button text="Log In" onClickFunc={handleSignIn}></Button>
    </div>
  );
}
