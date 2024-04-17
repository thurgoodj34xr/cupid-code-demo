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
    return (
        <section className={classes.container}>

        </section>
    );
}

export default JobHistory;
