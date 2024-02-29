import { useState, useEffect, useContext } from "react";
import classes from "./sign_in.module.css";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";
import { useNavigate } from "react-router-dom";
import AppContext from "../../componets/app_context";
import * as Api from "../../hook/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faAppleWhole,
  faBook,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import SignOn from "../../componets/sign_on/sign_on";
import {
  FaApple,
  FaBeer,
  FaFacebook,
  FaFacebookMessenger,
  FaFacebookSquare,
  FaGoogle,
  FaGooglePay,
} from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState("Sign in");

  const context = useContext(AppContext);

  let navigate = useNavigate();

  const SigninWithToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const resp = await Api.Post("/verifyToken", {
      token,
    });

    if (!resp.user) {
      setLoading(false);
      return;
    }
    context.updateUser(resp.user);
    context.updateTokens(resp.tokens);
    navigate("/Home");
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
    setButtonText(
      <FontAwesomeIcon className="rotate" icon={faSpinner} size="xl" />
    );
    const res = await Api.Post("/signin", {
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
      setButtonText("Sign in");
    } else {
      context.updateUser(res.user);
      context.updateTokens(res.tokens);
      localStorage.setItem("token", res.tokens.refreshToken);
      navigate("/Home");
    }
  };

  const signUp = () => {
    navigate("/SelectAccount");
  };

  return loading ? (
    <div></div>
  ) : (
    <div className={classes.sign_in}>
      <h1>Cupid Code</h1>
      {error && <p className="error">{error}</p>}
      <p className="label">Let’s get started by filling out the form below.</p>
      <Input
        inputType="email"
        placeholder="Enter Email"
        onChangeFunc={(email) => setEmail(email)}
      />
      <Input
        inputType="password"
        placeholder="Enter Password"
        onChangeFunc={(p) => setPassword(p)}
      />
      <span className="pointer right">Forgot Password?</span>
      <Button text={buttonText} onClickFunc={handleSignIn}></Button>
      <p className="label">Or sign up with</p>
      <SignOn ricon={<FaApple size="2rem" />} text="Continue with Apple" />
      <SignOn ricon={<FaGoogle size="2rem" />} text="Continue with Google" />
      <SignOn
        ricon={<FaFacebook size="2rem" />}
        text="Continue with Facebook"
      />
      <p>
        Don't have an account?{" "}
        <span className="pointer" onClick={signUp}>
          Sign up
        </span>
      </p>
    </div>
  );
}
