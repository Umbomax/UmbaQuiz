import React, { useState, useEffect } from "react";
import classes from "./Registration.module.css";
import MyInput from "../../../UI/MyInput/MyInput";
import { isEmail, isFill } from "../../../../Scripts/validation";

function Registration({ createError, onRegisterSuccess }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        repeatedPassword: "",
        email: "",
    });
    const apiUrl = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (errors.length > 0) {
            createError(errors);
            setErrors([]);
        }
    }, [errors, createError]);

    const pushStatus = (text, status) => {
        const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);
        let newError;
        do {
            newError = {
                id: generateUniqueId(),
                errorText: text,
                status: status,
            };
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
        if (formData.password !== formData.repeatedPassword) {
            pushStatus("Пароли не совпадают", "error");
            valid = false;
        }
        if (!isEmail(formData.email)) {
            pushStatus("Введите корректный email", "error");
            valid = false;
        }
        return valid;
    };

    async function sendUserData(e) {
        e.preventDefault();
        let validationPassed = checkValidationErrors();
        if (validationPassed) {
            try {
                const response = await fetch(`${apiUrl}/registration`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                pushStatus("Регистрация прошла успешно", "ok");
                onRegisterSuccess();
            } catch (error) {
                pushStatus(`Что-то пошло не так ${error}`, "error");
            }
        }
    }

    return (
        <form className={classes.form} onSubmit={sendUserData}>
            <div className={classes.inputContainer}>
                <MyInput
                    className={classes.formInput}
                    type="text"
                    placeholder="Login"
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
            </div>
            <div className={classes.inputContainer}>
                <MyInput
                    className={classes.formInput}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>
            <div className={classes.inputContainer}>
                <MyInput
                    className={classes.formInput}
                    type="password"
                    placeholder="Repeat password"
                    onChange={(e) => setFormData({ ...formData, repeatedPassword: e.target.value })}
                />
            </div>
            <div className={classes.inputContainer}>
                <MyInput
                    className={classes.formInput}
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <button className={classes.formBtn} type="submit">
                Sign Up
            </button>
        </form>
    );
}

export default Registration;
