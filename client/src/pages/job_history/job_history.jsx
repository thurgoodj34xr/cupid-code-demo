import { useEffect, useState } from "react";
import classes from "./job_history.module.css";
import Button from "../../componets/button/button";
import useContext from "../../hooks/context";
import Api from "../../hooks/api";

function JobHistory() {
    const context = useContext();
    const user = context.getUser();
    const [employmentStatus, setEmploymentStatus] = useState(user.cupid.fired);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const changeEmployment = async () => {
        console.log(user)
        var userId = user.id
        const response = await Api.PostWithAuth(
            "/cupids/changeEmployment",
            { userId, employmentStatus },
            context
        );
        if (!response.error) {
            // Update user profile with the new balance
            user.Cupid.fired = !employmentStatus;
            context.updateUser(user);
            setEmploymentStatus(!employmentStatus)
            setErrorMessage(null); // Clear any previous error messages
            setSuccessMessage(`You successfully changed your employment status`);
        } else {
            setSuccessMessage(null); // Clear previous success message
            setErrorMessage(response.error);
        }
    }
    return (
        <section className={classes.container}>
            <h1>JobHistory</h1>
            {errorMessage && <ResponseMessage type="error" message={errorMessage} />}
            {successMessage && (
                <ResponseMessage type="success" message={successMessage} />
            )}
            <p>You are currently fired: {employmentStatus}</p>
            <Button onClickFunc={changeEmployment} text="Change Employment Status" />
        </section>
    );
}

export default JobHistory;
