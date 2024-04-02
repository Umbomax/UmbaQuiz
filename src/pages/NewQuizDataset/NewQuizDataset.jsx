import React, { useState, useEffect } from "react";
import classes from "./NewQuizDataset.module.css";
import { useLocation } from "react-router-dom";
import MyImageInput from "../../Components/UI/MyImageInput/MyImageInput";
import MyInput from "../../Components/UI/MyInput/MyInput";
import axios from 'axios';

function NewQuizDataset() {
    const location = useLocation();
    const quizNums = +location.state.quizQuestionsNumbers;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formData, setFormData] = useState(new FormData()); // Инициализация FormData здесь

    useEffect(() => {
        const formDataObject = location.state;
        const newFormData = new FormData(); // Создание нового объекта FormData
        for (const key in formDataObject) {
            newFormData.append(key, formDataObject[key]);
        }
        setFormData(newFormData); // Установка нового объекта FormData в состояние
    }, [location.state]);

    const arr = Array(quizNums).fill(null);

    const inlineStyle = {
        width: `${100 * quizNums}%`,
    };

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
    };

    const setQuestion = (e, idx) => {
        const updatedFormData = new FormData(formData); // Копирование текущего объекта FormData
        updatedFormData.set(`${idx}.questionText`, e.target.value);
        setFormData(updatedFormData);
    };

    function sendFormData(e) {
        e.preventDefault();
        console.log("FormData contents:");
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }
        axios
            .post("http://localhost:3030/api/uploadQuiz", formData, {                       
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); 
            })
            .then((data) => {
                console.log("Сервер ответил:", data);
            })
            .catch((error) => {
                console.error("There was a problem with your fetch operation:", error);
            });
    }

    return (
        <div>
            <div className={classes.carouser}>
                {arr.map((el, idx) => (
                    <div key={idx} className={classes.carouserItem} onClick={(e) => setCurrentSlide(+idx)}>
                        {idx + 1}
                    </div>
                ))}
            </div>

            <div className={classes.quizFormsWrapper}>
                <div style={inlineStyle} className={classes.quizFormsContainer}>
                    {arr.map((el, idx) => (
                        <form style={activeSlide} key={idx} className={classes.quizForm}>
                            <h2>{`Форма номер ${idx + 1}`}</h2>
                            <div className={classes.inputWrapper}>
                                <MyInput type="text" placeholder="Введите вопрос" formData={formData} idx={idx} onChange={(e) => setQuestion(e, idx)} />
                            </div>

                            <div className={classes.correctAnswer}>
                                <MyImageInput
                                    className={classes.fileInput}
                                    type="file"
                                    placeholder="Правильный ответ"
                                    formData={formData}
                                    options={{ num: idx, type: "correct" }}                                    
                                />
                            </div>
                            <div className={classes.incorrectAnswersWrapper}>
                                <div className={classes.incorrectAnswers}>
                                    <MyImageInput type="file" placeholder="НеПравильный ответ" formData={formData} options={{ num: idx, type: "incorrect" }} />
                                    <MyImageInput type="file" placeholder="НеПравильный ответ" formData={formData} options={{ num: idx, type: "incorrect" }}  />
                                    <MyImageInput type="file" placeholder="НеПравильный ответ" formData={formData} options={{ num: idx, type: "incorrect" }}  />
                                </div>
                            </div>
                        </form>
                    ))}
                </div>
            </div>

            <div className={classes.wrapperBtn}>
                <button onClick={sendFormData}>ЗАГРУЗИТЬ</button>
            </div>
        </div>
    );
}

export default React.memo(NewQuizDataset);