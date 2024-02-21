import { useEffect, useState } from "react"
import classes from "./notification.module.css"

export default function Notification({ text }) {

    const [show, setShow] = useState(true)

    useEffect(() => {
        setShow(false)
        setTimeout(() => {
            setShow(true);
        }, 500)
    }, [text])

    return !show ? '' :
        <div className={classes.notification}>
            <span>{text}</span>
        </div >

}