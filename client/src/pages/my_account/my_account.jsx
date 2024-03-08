import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Button from "../../componets/button/button";
import Input from "../../componets/inputs/input";
import ResponseMessage from "../../componets/responseMessage/responseMessage";
import TextArea from "../../componets/text_area/text_area";
import Api from "../../hooks/api";
import classes from "./my_account.module.css";
import useContext from "../../hooks/context";
1;

function MyAccount() {
  const context = useContext();
  const user = context.getUser();
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.profile.age);
  const [dailyBudget, setBudget] = useState(user.profile.dailyBudget);
  const [relationshipGoals, setGoals] = useState(
    user.profile.relationshipGoals
  );
  const [userType, setUserType] = useState("Standard");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState("Update");

  const updateProfile = async () => {
    setSubmitButtonText(
      <FontAwesomeIcon className="rotate" icon={faSpinner} size="xl" />
    );
    const response = await Api.PostWithAuth(
      "/users/update",
      {
        firstName,
        lastName,
        email,
        age,
        dailyBudget,
        relationshipGoals,
      },
      context
    );
    if (!response.error) {
      user.email = email;
      user.firstName = firstName;
      1;
      user.lastName = lastName;
      user.profile.age = age;
      user.profile.dailyBudget = dailyBudget;
      user.profile.relationshipGoals = relationshipGoals;
      setErrorMessage(null);
      setSuccessMessage(response.message);
    } else {
      setSuccessMessage(null);
      setErrorMessage(response.error);
    }
    setSubmitButtonText("Update");
  };

  return (
    <section className={classes.container}>
      {errorMessage && <ResponseMessage type="error" message={errorMessage} />}
      {successMessage && (
        <ResponseMessage type="success" message={successMessage} />
      )}
      <p className="label left">Account Details</p>
      <section className={classes.main}>
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
        {userType != "Standard" ? (
          ""
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
              state={dailyBudget == 0 ? "" : dailyBudget}
              setState={setBudget}
            />
            <TextArea
              placeholder="Enter Relationship Goals"
              state={relationshipGoals}
              setState={setGoals}
            />
          </>
        )}
        <Button text={submitButtonText} onClickFunc={updateProfile} />
      </section>
    </section>
  );
}

export default MyAccount;
