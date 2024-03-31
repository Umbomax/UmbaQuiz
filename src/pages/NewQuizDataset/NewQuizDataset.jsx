import React, { useState } from "react";
import classes from "./NewQuizDataset.module.css";
import { useLocation } from "react-router-dom";
import MyImageInput from "../../Components/UI/MyImageInput/MyImageInput";
import MyInput from "../../Components/UI/MyInput/MyInput";
import axios from 'axios';
function NewQuizDataset() {
    // const formData = new FormData();

    const location = useLocation();
    // const { state } = location;
    const quizNums = +location.state.quizesCount;
// Получение данных из state
const formDataObject = location.state;
// Создание нового объекта FormData
const formData = new FormData();
// Добавление данных из объекта в FormData
for (const key in formDataObject) {
    formData.append(key, formDataObject[key]);
}
    // formData.set("quizNums", quizNums);
    // formData.set("quizType", state.type);
    // formData.set("quizName", state.quizName);


    const [currentSlide, setCurrentSlide] = useState(0);

    const arr = Array(quizNums).fill(null); // Пустой массив длинной количества вопросов для созданий нужного числа форм

    // Исходя из числа вопросов задаем ширину для форм
    const inlineStyle = {
        width: `${100 * quizNums}%`,
    };

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
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
                return response.json(); // Если сервер возвращает JSON, можете изменить метод на response.text() или response.blob()
            })
            .then((data) => {
                // Обработка ответа от сервера, если необходимо
                console.log("Сервер ответил:", data);
            })
            .catch((error) => {
                // Обработка ошибок
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
                                <MyInput type="text" placeholder="Введите вопрос" onChange={(e) => formData.set(`${idx}.questionText`, e.target.value)} />
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

export default NewQuizDataset;
