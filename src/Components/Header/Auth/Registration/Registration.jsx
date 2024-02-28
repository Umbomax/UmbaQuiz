import React from "react";
import { useState } from "react";
import classes from "./Registration.module.css";
import MyInput from "../../../UI/MyInput/MyInput";

import validation,{isEmail,isFill} from "../../../../Scripts/validation";

function Registration({ createError }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        repeatedPassword: "",
        email: "",
    });

    const checkValidationErrors = async() => {
        let valid = true;
        
        if (!isFill(formData.username)) {
            sendError("Поле Username не должно быть пустым");
            valid = false;
        }

        if (!isFill(formData.password)) {
            sendError("Поле Password не должно быть пустым");
            valid = false;
        }

        if (!(formData.password === formData.repeatedPassword)) {
            sendError("Пароли не совпадают");
            valid = false;
        }

        if (isEmail(formData.email)) {
            sendError("Пароли не совпадают");
            valid = false;
        }

        return valid;
    };

    const sendError = (text) => {
        const newError = {
            id: Date.now(),
            errorText: text,
        };
        createError(newError);
    };

    async function sendUserData(e) {
        
        e.preventDefault();
        if (checkValidationErrors()) {
            await fetch("http://localhost:3030/api/registration", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    sendError("Регистрация прошла успешно");
                })
                .catch((error) => {
                    // Обработка ошибок при выполнении запроса
                    sendError(`Что то пошло не так ${error}`);
                });
        }
    }

    return (
        <form className={classes.form} action="" method="post">
            <div className={classes.inputContainer}>
                <MyInput className={classes.formInput} type="text" placeholder="Login" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            </div>
            <div className={classes.inputContainer}>
                <MyInput className={classes.formInput} type="text" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div className={classes.inputContainer}>
                <MyInput className={classes.formInput} type="text" placeholder="Repeat password" onChange={(e) => setFormData({ ...formData, repeatedPassword: e.target.value })} />
            </div>
            <div className={classes.inputContainer}>
                <MyInput className={classes.formInput} type="text" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <button className={classes.formBtn} onClick={sendUserData} type="button">
                Sign Up
            </button>
        </form>
    );
}

export default Registration;
