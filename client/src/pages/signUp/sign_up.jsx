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
import {
  FaCamera,
  FaCameraRetro,
  FaCircle,
  FaMonero,
  FaPersonBooth,
  FaUser,
} from "react-icons/fa";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [buttonText, setButtonText] = useState("Sign Up");
  const [age, setAge] = useState(0);
  const [budget, setBudget] = useState(0);
  const [goals, setGoals] = useState("");
  const [male, setMale] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const context = useContext(AppContext);
  const userType = context.getAccountType();
  let navigate = useNavigate();

  function handleChange(e) {
    console.log(e.target.files);
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  }

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
      profileImage,
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
      <span className={classes.profilePhoto}>
        <img
          src={
            profileImage
              ? profileImage
              : "https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg"
          }
          width="120px"
          height="120px"
          accept="image/*"
        />
        <div onClick={handleChange} className={classes.cameraContainer}>
          <label className={classes.label} htmlFor="file-input">
            <FaCameraRetro className={classes.camera} size="22px" />
          </label>
          <input
            className={classes.fileInput}
            id="file-input"
            type="file"
            onChange={handleChange}
          />
        </div>
      </span>
      {error && <p className="error">{error}</p>}
      <Input
        inputType="text"
        placeholder="Enter First Name"
        state={firstName}
        setState={setFirstName}
        require
      />
      <Input
        inputType="text"
        placeholder="Enter Last Name"
        state={lastName}
        setState={setLastName}
      />
      <Input
        inputType="email"
        placeholder="Enter Email"
        state={email}
        setState={setEmail}
      />
      <Input
        inputType="password"
        placeholder="Enter Password"
        state={password}
        setState={setPassword}
      />
      <Input
        inputType="password"
        placeholder="Confirm Password"
        state={confirmPassword}
        setState={setConfirmPassword}
      />
      {userType != "Standard" ? (
        <>
          <TextArea placeholder="Enter Bio" state={bio} setState={setBio} />
        </>
      ) : (
        <>
          <Input
            inputType="number"
            placeholder="Enter Age"
            state={age == 0 ? "" : age}
            setState={setAge}
          />
          <Input
            inputType="number"
            placeholder="Enter Budget Per Date"
            state={budget == 0 ? "" : budget}
            setState={setBudget}
          />
          <TextArea
            placeholder="Enter Relationship Goals"
            state={goals}
            setState={setGoals}
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
