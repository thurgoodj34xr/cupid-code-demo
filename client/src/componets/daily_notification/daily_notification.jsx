import classes from "./daily_notificaiton.module.css";
function DailyNotification({ title, body }) {
    return (
        <div className={classes.container}>
            <div className={classes.left}>
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
            <div className={classes.right}>
                <p>{'>'}</p>
                <p className="label">2m</p>
            </div>
        </div>
    )
}

export default DailyNotification;