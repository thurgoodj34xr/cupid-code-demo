import { useEffect, useState, useContext } from "react";
import classes from "./sign_up.module.css";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";
import { useNavigate } from "react-router-dom";
import AppContext from "../../componets/app_context";

function SignUp() {
  const context = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState();

  let navigate = useNavigate();

  function handleEmail(email) {
    setEmail(email);
  }

  function handlePassword(password) {
    setPassword(password);
  }

  const signUp = async () => {
    const res = await fetch("/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    }).then((resp) => resp.json());
    if (res.error) {
      setError(res.error);
    } else {
      context.updateUser(res);
      navigate("/");
    }
  };

  const signIn = () => {
    navigate("/");
  };

  return (
    <section className={classes.container}>
      <h1>Sign Up</h1>
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
      <p onClick={signIn}>
        Already have an account? <span className="pointer">Sign In</span>
      </p>
      <Button text="Sign Up" onClickFunc={signUp}></Button>
    </section>
  );
}

export default SignUp;
