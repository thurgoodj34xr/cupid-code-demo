import { useState } from "react";
import Button from "../../componets/button/button";
import Input from "../../componets/inputs/input";
import ResponseMessage from "../../componets/responseMessage/responseMessage";
import classes from "../my_account/my_account.module.css";
import useContext from "../../hooks/context";
import Api from "../../hooks/api";

function UpdatePassword() {
  const context = useContext();
  const user = context.getUser();
  const [repeatNew, setRepeatNew] = useState("");
  const [current, setCurrent] = useState("");
  const [newPass, setnewPass] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const updatePassword = async () => {
    if (newPass !== repeatNew) {
      setSuccessMessage(null);
      setErrorMessage("New Password fields don't match");
      return;
    }
    const response = await Api.PostWithAuth(
      "/users/password",
      {
        currentPassword: current,
        newPassword: newPass,
      },
      context
    );
    if (!response.error) {
      user.p;
      setErrorMessage(null);
      setSuccessMessage(response.message);
      setCurrent("");
      setnewPass("");
      setRepeatNew("");
    } else {
      setSuccessMessage(null);
      setErrorMessage(response.error);
    }
  };

  return (
    <section className={classes.container}>
      {errorMessage && <ResponseMessage type="error" message={errorMessage} />}
      {successMessage && (
        <ResponseMessage type="success" message={successMessage} />
      )}
      <p>
        Welcome {user.firstName} please input your old password followed by your
        new password
      </p>
      <section className={classes.main}>
        <Input
          inputType="password"
          placeholder="Current Password"
          state={current}
          setState={setCurrent}
          require
        />
        <Input
          inputType="password"
          placeholder="New Password"
          state={newPass}
          setState={setnewPass}
        />
        <Input
          inputType="password"
          placeholder="Confirm New Password"
          state={repeatNew}
          setState={setRepeatNew}
        />
        <Button text="Update" onClickFunc={updatePassword} />
      </section>
    </section>
  );
}

export default UpdatePassword;
