import classes from "./my_account.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";
import Input from "../../componets/inputs/input";
import TextArea from "../../componets/text_area/text_area";
import Button from "../../componets/button/button";

function MyAccount() {
  const context = useContext(AppContext);
  const user = context.getUser();
  console.log(user);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.profile.age);
  const [budget, setBudget] = useState(user.profile.dailyBudget);
  const [goals, setGoals] = useState(user.profile.relationshipGoals);
  const [userType, setUserType] = useState("Standard");

  return (
    <section className={classes.container}>
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
              state={budget == 0 ? "" : budget}
              setState={setBudget}
            />
            <TextArea
              placeholder="Enter Relationship Goals"
              state={goals}
              setState={setGoals}
            />
          </>
        )}
        <Button text="Update" />
      </section>
    </section>
  );
}

export default MyAccount;
