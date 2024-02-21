import { useState, useEffect } from "react"
import styles from "./inputs.module.css"

export default function Input({ text, placeholder, onChangeFunc, inputType = 'text', }) {
    const [inputV, setinputV] = useState('')


    useEffect(() => {
        function handleKeyDown(e) {
            if (e.keyCode === 13) {
                setinputV('');
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [inputV])

    function handleChange(e) {
        setinputV(e.target.value)
        onChangeFunc(e.target.value)
    }

    return (
        <div className={`${styles.inputV}`}>
            <label htmlFor="">{text}</label>
            <input type={inputType} placeholder={placeholder} onChange={handleChange} value={inputV} />
        </div>
    )
}