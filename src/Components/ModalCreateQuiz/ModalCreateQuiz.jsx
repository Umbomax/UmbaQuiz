import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import MyImageInput from "../UI/MyImageInput/MyImageInput";
import classes from "./ModalCreateQuiz.module.css";

function ModalCreateQuiz({ visible, setVisible, quizType, createError }) {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [errors, setErrors] = useState([]);
    const [quizSettings, setQuizSettings] = useState({
        quizName: "",
        quizesCount: "",
        type: quizType,
        quizHeadImage: "",
        isPrivate: false,
        description: "",
        isTimed: false,
        quizTime: "",
        forRegisteredUsers: false
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
        }
    }, []);

    useEffect(() => {
        setQuizSettings(prevSettings => ({
            ...prevSettings,
            type: quizType
        }));
    }, [quizType]);

    const rootClasses = [classes.myModal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    function setHeadImage(base64string) {
        setQuizSettings({ ...quizSettings, quizHeadImage: base64string });
    }

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
        if (!quizSettings.quizName) {
            pushStatus("Поле Название викторины не должно быть пустым", "error");
            valid = false;
        } else if (quizSettings.quizName.length > 20) {
            pushStatus("Максимальная длина названия - 20 символов", "error");
            valid = false;
        }
        if (!quizSettings.quizesCount) {
            pushStatus("Поле Количество вопросов не должно быть пустым", "error");
            valid = false;
        } else if ((quizSettings.type === '1q4img' || quizSettings.type === '1q1img') && parseInt(quizSettings.quizesCount) > 20) {
            pushStatus("Максимальное количество вопросов для данного типа - 20", "error");
            valid = false;
        } else if ((quizSettings.type === '1q1img' || quizSettings.type === '1q1textanswer') && parseInt(quizSettings.quizesCount) < 4) {
            pushStatus("Минимальное количество вопросов для данного типа - 4", "error");
            valid = false;
        }
        if (quizSettings.description.length > 400) {
            pushStatus("Максимальная длина описания - 400 символов", "error");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkValidationErrors()) {
            const quizData = { ...quizSettings, userId };
            navigate("/newQuizDataset", { state: quizData });
        }
    };

    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                <button className={classes.closeButton} onClick={() => setVisible(false)}>Х</button>
                <div className={classes.textInputWrapper}>
                    <div className={classes.quizNameWrapper}>
                        <div>Введите название викторины</div>
                        <input
                            className={classes.quizSelectInput}
                            type="text"
                            value={quizSettings.quizName}
                            onChange={(e) => setQuizSettings({ ...quizSettings, quizName: e.target.value })}
                        />
                    </div>
                    <div>
                        <div>Введите количество вопросов</div>
                        <input
                            className={classes.quizSelectInput}
                            type="number"
                            value={quizSettings.quizesCount}
                            onChange={(e) => setQuizSettings({ ...quizSettings, quizesCount: e.target.value })}
                        />
                    </div>
                </div>
                <div className={classes.textInputWrapper}>
                    <div className={classes.quizDescriptionWrapper}>
                        <div>Введите описание викторины</div>
                        <textarea
                            className={classes.quizDescriptionInput}
                            value={quizSettings.description}
                            onChange={(e) => setQuizSettings({ ...quizSettings, description: e.target.value })}
                        />
                    </div>
                </div>
                <div className={classes.checkboxWrapper}>
                    <input
                        type="checkbox"
                        id="isPrivate"
                        checked={quizSettings.isPrivate}
                        onChange={(e) => setQuizSettings({ ...quizSettings, isPrivate: e.target.checked })}
                    />
                    <label htmlFor="isPrivate">Сделать викторину приватной</label>
                </div>
                <div className={classes.checkboxWrapper}>
                    <input
                        type="checkbox"
                        id="isTimed"
                        checked={quizSettings.isTimed}
                        onChange={(e) => setQuizSettings({ ...quizSettings, isTimed: e.target.checked })}
                    />
                    <label htmlFor="isTimed">Викторина по времени</label>
                </div>
                {quizSettings.isTimed && (
                    <div className={classes.textInputWrapper}>
                        <div>
                            <div>Введите время на викторину в секундах</div>
                            <input
                                className={classes.quizSelectInput}
                                type="number"
                                value={quizSettings.quizTime}
                                onChange={(e) => setQuizSettings({ ...quizSettings, quizTime: e.target.value })}
                            />
                        </div>
                    </div>
                )}
                <div className={classes.checkboxWrapper}>
                    <input
                        type="checkbox"
                        id="forRegisteredUsers"
                        checked={quizSettings.forRegisteredUsers}
                        onChange={(e) => setQuizSettings({ ...quizSettings, forRegisteredUsers: e.target.checked })}
                    />
                    <label htmlFor="forRegisteredUsers">Только для зарегистрированных пользователей</label>
                </div>
                <div className={classes.headImage}>
                    <div>Выберите изображение для отображения в списке викторин</div>
                    <MyImageInput className={classes.imageWrapper} setHeadImage={setHeadImage} />
                </div>
                <button
                    className={classes.submitBtn}
                    onClick={handleSubmit}
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
}

export default ModalCreateQuiz;
