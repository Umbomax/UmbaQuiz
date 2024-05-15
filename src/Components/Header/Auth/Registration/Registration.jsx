import React, { useState, useEffect } from "react";
import classes from "./Registration.module.css";
import MyInput from "../../../UI/MyInput/MyInput";
import { isEmail, isFill } from "../../../../Scripts/validation";

function Registration({ createError }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        repeatedPassword: "",
        email: "",
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (errors.length > 0) {
            console.log("Sending errors:", errors); // Лог для отладки
            createError(errors);
            setErrors([]);
        }
    }, [errors, createError]);

    const pushStatus = (text) => {
        const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);

        let newError;
        do {
            newError = {
                id: generateUniqueId(),
                errorText: text,
            };
        } while (errors.some(error => error.id === newError.id));

        console.log("Pushing new error:", newError); // Лог для отладки
        setErrors(prevErrors => [...prevErrors, newError]);
    };

    const checkValidationErrors = () => {
        let valid = true;

        if (!isFill(formData.username)) {
            pushStatus("Поле Username не должно быть пустым");
            valid = false;
        }

        if (!isFill(formData.password)) {
            pushStatus("Поле Password не должно быть пустым");
            valid = false;
        }

        if (formData.password !== formData.repeatedPassword) {
            pushStatus("Пароли не совпадают");
            valid = false;
        }

        if (!isEmail(formData.email)) {
            pushStatus("Введите корректный email");
            valid = false;
        }

        return valid;
    };

    async function sendUserData(e) {
        e.preventDefault();
    
        let validationPassed = checkValidationErrors();
        if (validationPassed) {
            try {
                const response = await fetch("https://umbaquizserver-production.up.railway.app/api/registration", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
    
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
    
                const data = await response.json();
                console.log("Registration success response:", data); // Лог для отладки
                pushStatus("Регистрация прошла успешно");
            } catch (error) {
                console.error("Error during registration:", error); // Лог для отладки
                pushStatus(`Что-то пошло не так ${error}`);
            }
        }
    }
    
    

    return (
        <form className={classes.form} action="" method="post">
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
                    type="text"
                    placeholder="Password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
            </div>
            <div className={classes.inputContainer}>
                <MyInput
                    className={classes.formInput}
                    type="text"
                    placeholder="Repeat password"
                    onChange={(e) => setFormData({ ...formData, repeatedPassword: e.target.value })}
                />
            </div>
            <div className={classes.inputContainer}>
                <MyInput
                    className={classes.formInput}
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <button className={classes.formBtn} onClick={sendUserData} type="button">
                Sign Up
            </button>
        </form>
    );
}

export default Registration;
