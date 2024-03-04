import classes from "./my_account.module.css";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../componets/navbar/navbar";
import AppContext from "../../componets/app_context";
import Input from "../../componets/inputs/input";
import Button from "../../componets/button/button";

function MyAccount() {
  const context = useContext(AppContext);
  const user = context.getUser();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(true);
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [goals, setGoals] = useState();
  
  useEffect(() => { 
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setAge(user.age)
    setGender(user.gender)
    setGoals(user.goals)
    setLoading(false);
  }, []);

  const updateUser = () => {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.gender = gender;
    user.goals = goals;
    console.log({user})
  };

  return (
    loading ? <div></div> : (
      <div className={classes.container}>
        <Input text="First Name" placeholder={firstName} onChangeFunc={(v) => setFirstName(v)}/>
        <Input text="Last Name" placeholder={lastName} onChangeFunc={(v) => setLastName(v)}/>
        <Input text="Age" placeholder={age} onChangeFunc={(v) => setAge(v)}/>
        <Input text ="Relationship Goals" placeholder={goals} onChangeFunc={(v) => setGoals(v)}/>
        <Button text="Update User" onClickFunc={updateUser}/>
      </div>
    )
  )
}


export default MyAccount;
