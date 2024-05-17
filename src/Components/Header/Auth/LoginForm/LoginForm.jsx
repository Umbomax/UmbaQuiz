import React from "react";
import { useState, useEffect } from "react";
import classes from "./LoginForm.module.css";
import MyInput from "../../../UI/MyInput/MyInput";
import { isFill } from "../../../../Scripts/validation";

function LoginForm({ createError, onSuccess }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState([]);

    const pushStatus = (text, status) => {
        const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);
        let newError;
        do {
            newError = { id: generateUniqueId(), errorText: text, status: status };
        } while (errors.some(error => error.id === newError.id));
        setErrors(prevErrors => [...prevErrors, newError]);
    };

    const checkValidationErrors = () => {
        let valid = true;
        if (!isFill(formData.username)) {
            pushStatus("Поле Username не должно быть пустым", "error");
            valid = false;
        }
        if (!isFill(formData.password)) {
            pushStatus("Поле Password не должно быть пустым", "error");
            valid = false;
        }
        return valid;
    };

    useEffect(() => {
        if (errors.length > 0) {
            createError(errors);
            setErrors([]);
        }
    }, [errors, createError]);

    const login = async (e) => {
        e.preventDefault();
        if (checkValidationErrors()) {
            try {
                const response = await fetch("https://umbaquizserver-production.up.railway.app/api/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                localStorage.setItem('UserName', data.username);
                localStorage.setItem('token', data.token);
                localStorage.setItem('roles', JSON.stringify(data.roles));
                createError([{ id: Date.now(), errorText: "Успешный вход", status: "ok" }]);
                onSuccess();
            } catch (error) {
                pushStatus('There was a problem with your fetch operation: ' + error.message, "error");
            }
        }
    };

    return (
        <form className={classes.form} action="" method="get">
            <div className={classes.inputContainer}>
                <MyInput
                    className={classes.formInput}
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
            </div>
            <div className={classes.inputContainer}>
                <MyInput
                    className={classes.formInput}
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>
            <button className={classes.formBtn} type="button" onClick={login}>
                Log In
            </button>
        </form>
    );
}

export default LoginForm;
