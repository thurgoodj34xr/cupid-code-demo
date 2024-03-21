import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "../../componets/button/button";
import Input from "../../componets/inputs/input";
import TextArea from "../../componets/text_area/text_area";
import Api from "../../hooks/api";
import useInit from "../../hooks/useInit";
import classes from "./my_account.module.css";
import ResponseMessage from "../../componets/responseMessage/responseMessage";
import useContext from "../../hooks/context";

function MyAccount() {
  const [userType, setUserType] = useState("Standard");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [submitButtonText, setSubmitButtonText] = useState("Update");
  const context = useContext();
  const user = context.getUser();

  const updateProfile = async () => {
    setSubmitButtonText(
      <FontAwesomeIcon className="rotate" icon={faSpinner} size="xl" />
    );
    const response = await Api.PostWithAuth(
      "/users/update",
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.profile.age,
        dailyBudget: user.profile.dailyBudget,
        relationshipGoals: user.profile.relationshipGoals,
      },
      context
    );
    if (!response.error) {
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
          state={user.firstName}
          setState={(firstName) =>
            setUser((old) => ({ ...old, firstName: firstName }))
          }
          require
        />
        <Input
          inputType="text"
          placeholder="Enter Last Name"
          state={user.lastName}
          setState={(lastName) => setUser((old) => ({ ...old, lastName }))}
        />
        <Input
          inputType="user.email"
          placeholder="Enter user.email"
          state={user.email}
          setState={(email) => setUser((old) => ({ ...old, email }))}
        />
        {user.profile && (
          <>
            <Input
              inputType="number"
              placeholder="Enter age"
              state={user.profile.age == 0 ? "" : user.profile.age}
              setState={(age) =>
                setUser((old) => ({
                  ...old,
                  profile: { ...old.profile, age: parseInt(age) },
                }))
              }
            />
            <Input
              inputType="number"
              placeholder="Enter Budget Per Date"
              state={
                user.profile.dailyBudget == 0 ? "" : user.profile.dailyBudget
              }
              setState={(dailyBudget) =>
                setUser((old) => ({
                  ...old,
                  profile: { ...old.profile, dailyBudget: Number(dailyBudget) },
                }))
              }
            />
            <TextArea
              placeholder="Enter Relationship Goals"
              state={user.profile.relationshipGoals}
              setState={(relationshipGoals) =>
                setUser((old) => ({
                  ...old,
                  profile: { ...old.profile, relationshipGoals },
                }))
              }
            />
          </>
        )}
        <Button text={submitButtonText} onClickFunc={updateProfile} />
      </section>
    </section>
  );
}

export default MyAccount;
