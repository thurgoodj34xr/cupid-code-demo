import { useEffect, useState, useContext } from "react";
import classes from "./sign_up.module.css";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";
import { useNavigate } from "react-router-dom";
import * as Api from "../../hook/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../componets/app_context";
import TextArea from "../../componets/text_area/text_area";

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
  const [male, setMale] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState();

  const context = useContext(AppContext);
  const userType = context.getAccountType();
  let navigate = useNavigate();

  const setUser = () => {
    setMale(true);
  };

  const setCupid = () => {
    setMale(false);
  };

  function handleEmail(email) {
    setEmail(email);
  }

  function handlePassword(password) {
    setPassword(password);
  }

  const signUp = async () => {
    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setButtonText(
      <FontAwesomeIcon className="rotate" icon={faSpinner} size="xl" />
    );
    const res = await Api.Post("/signup", {
      userType,
      firstName,
      lastName,
      email,
      password,
      age,
      budget,
      goals,
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
      <p className="label">Create an account by filling out the form below.</p>
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
        inputType="password"
        placeholder="Confirm Password"
        onChangeFunc={(p) => setConfirmPassword(p)}
      />
      {userType != "Standard" ? (
        ""
      ) : (
        <>
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
          <TextArea
            placeholder="Enter Relationship Goals"
            onChangeFunc={(e) => setGoals(e)}
          />
          <div className={classes.select}>
            <p onClick={setUser} className={male ? classes.type : ""}>
              Male
            </p>
            <p>|</p>
            <p onClick={setCupid} className={male ? "" : classes.type}>
              Female
            </p>
          </div>
        </>
      )}
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
