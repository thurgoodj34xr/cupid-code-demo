import { useEffect, useState, useContext } from "react";
import classes from "./sign_up_cupid.module.css";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";
import { useNavigate } from "react-router-dom";
import * as Api from "../../hook/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function SignUpCupid() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState();
  const [buttonText, setButtonText] = useState("Sign Up");

  let navigate = useNavigate();

  function handleEmail(email) {
    setEmail(email);
  }

  function handlePassword(password) {
    setPassword(password);
  }

  const signUp = async () => {
    setButtonText(
      <FontAwesomeIcon className="rotate" icon={faSpinner} size="2xl" />
    );
    const res = await Api.Post("/signup", {
      firstName,
      lastName,
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
      setButtonText("Sign Up");
    } else {
      navigate("/");
    }
  };

  const signIn = () => {
    navigate("/");
  };

  return (
    <section className={classes.container}>
      <div className="back">
        <FontAwesomeIcon
          onClick={() => navigate("/SelectAccount")}
          className="pointer"
          icon={faAngleLeft}
          size="2xl"
        />
      </div>
      <h1>Create Account</h1>
      <p className="label">Type of Account: Cupid</p>
      {error && <p className="error">{error}</p>}
      <Input
        text="First Name"
        inputType="text"
        placeholder="Enter First Name"
        onChangeFunc={(name) => setFirstName(name)}
      />
      <Input
        text="Last Name"
        inputType="text"
        placeholder="Enter Last Name"
        onChangeFunc={(name) => setLastName(name)}
      />
      <Input
        text="Email"
        inputType="email"
        placeholder="Enter Email"
        onChangeFunc={handleEmail}
      />
      <Input
        text="Password"
        inputType="password"
        placeholder="Enter Password"
        onChangeFunc={handlePassword}
      />
      <p>
        Already have an account?
        <span className="pointer" onClick={signIn}>
          Sign In
        </span>
      </p>
      <Button text={buttonText} onClickFunc={signUp}></Button>
    </section>
  );
}

export default SignUpCupid;
