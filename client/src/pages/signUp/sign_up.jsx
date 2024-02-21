import { useEffect, useState } from "react"
import styles from "./sign_up.module.css"
import Input from "../../componets/inputs/input"
import Button from "../../componets/button/button"
import BackButton from "../backButton/backButton"


export default function SignUp({ notificationFunc, backButtonFunc }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignUp() {
        notificationFunc()


        function handleEmail(email) {
            setEmail(email)
        }

        function handlePassword(password) {
            setPassword(password)
        }

        return (
            <>
                <BackButton onClickFunc={backButtonFunc}></BackButton>
                <div className={`${styles.sign_in}`}>
                    <h1>Sign Up</h1>
                    <Input text='Email' placeholder='Enter Email' onChangeFunc={handleEmail}></Input>
                    <Input text='Password' inputType="password" placeholder='Enter Password' onChangeFunc={handlePassword}></Input>
                    <Button text='Sign Up' onClickFunc={handleSignUp}></Button>
                </div>
            </>
        )
    }