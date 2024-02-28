import { useEffect, useState, useContext } from "react";
import classes from "./sign_up.module.css";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";
import { useNavigate } from "react-router-dom";
import * as Api from "../../hook/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState();
  const [buttonText, setButtonText] = useState("Sign Up");
  const [age, setAge] = useState();
  const [budget, setBudget] = useState();
  const [goals, setGoals] = useState();

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
      <p className="label">Type of Account: Standard</p>
      {error && <p className="error">{error}</p>}
      <Input
        inputType="text"
        placeholder="Enter First Name"
        onChangeFunc={(name) => setFirstName(name)}
      />
      <Input
        inputType="text"
        placeholder="Enter Last Name"
        onChangeFunc={(name) => setLastName(name)}
      />
      <Input
        inputType="email"
        placeholder="Enter Email"
        onChangeFunc={handleEmail}
      />
      <Input
        inputType="password"
        placeholder="Enter Password"
        onChangeFunc={handlePassword}
      />
      <Input
        inputType="number"
        placeholder="Enter Age"
        onChangeFunc={(age) => setAge(age)}
      />
      <Input
        inputType="number"
        placeholder="Enter Budget Per Date"
        onChangeFunc={(budget) => setBudget(budget)}
      />
      <Input
        inputType="text"
        placeholder="Enter Relationship Goals"
        onChangeFunc={(goals) => setGoals(goals)}
      />
      <p>
        Already have an account?{" "}
        <span className="pointer" onClick={signIn}>
          Sign In
        </span>
      </p>
      <Button text={buttonText} onClickFunc={signUp}></Button>
    </section>
  );
}

export default SignUp;
