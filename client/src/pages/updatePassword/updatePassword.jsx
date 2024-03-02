import classes from './updatePassword.module.css'
import { useEffect, useState, useContext } from 'react';
import AppContext from "../../componets/app_context";
import * as Api from "../../hook/api";
import Input from "../../componets/inputs/input";


function UpdatePassword() {
    const context = useContext(AppContext);
    const user = context.getUser();
    const [repeatNew, setRepeatNew] = useState("");
    const [current, setCurrent] = useState("");
    const [newPass, setnewPass] = useState("");

    return (
        <section className={classes.container}>
            <p>Welcome {user.firstName} please input your old password followed by your new password</p>
            <Input
                inputType="text"
                placeholder="Current Password"
                state={current}
                setState={setCurrent}
                require
            />
            <Input
                inputType="text"
                placeholder="New Password"
                state={newPass}
                setState={setnewPass}
            />
            <Input
                inputType="text"
                placeholder="Repeat New Password"
                state={repeatNew}
                setState={setRepeatNew}
            />
        </section>
    )
}

export default UpdatePassword;