import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "./LoginForm.module.css";
import MyInput from "../../../UI/MyInput/MyInput";
import { isFill } from "../../../../Scripts/validation";
import { AuthContext } from '../../../../context/AuthContext';

function LoginForm({ createError, onSuccess }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState([]);
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

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
                const response = await fetch(`${apiUrl}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                localStorage.setItem('username', data.username);
                localStorage.setItem('token', data.token);
                localStorage.setItem('roles', JSON.stringify(data.roles));
                createError([{ id: Date.now(), errorText: "Успешный вход", status: "ok" }])
                logIn(data.username);
                if (onSuccess) {
                    onSuccess(data.username);
                }
                navigate('/');
            } catch (error) {
                console.error('Fetch error:', error);
                pushStatus('There was a problem with your fetch operation: ' + error.message, "error");
            }
        }
    };

    return (
        <form className={classes.form} onSubmit={login}>
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
            <button className={classes.formBtn} type="submit">
                Log In
            </button>
        </form>
    );
}

export default LoginForm;
