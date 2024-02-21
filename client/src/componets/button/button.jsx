import React from 'react';
import classes from './Button.module.css';

function Button({ text, onClickFunc }) {
    return (
        <button className={classes.btn} onClick={onClickFunc}>{text}</button>
    )
}

export default Button