import React, { useState, useEffect } from "react";
import classes from "./NewQuizDataset.module.css";
import { useLocation } from "react-router-dom";
import MyImageInput from "../../Components/UI/MyImageInput/MyImageInput";
import axios from "axios";

function NewQuizDataset() {
    const location = useLocation();
    const quizNums = +location.state.quizesCount;
    const [currentSlide, setCurrentSlide] = useState(0);

    // 1q4img  1q1img   1q4textanswer   1q1textanswer  

    const [quizData, setquizData] = useState({ quizName: location.state.quizName, quizesCount: location.state.quizesCount, type: location.state.type, quizHeadImage: location.state.quizHeadImage }); // Инициализация FormData здесь

    const [quizQuestions, setQuizQuestions] = useState([]);
    // создание массива для фанных викторины, исходя из значения количесва вопросов

    // if(quizData.type=="1q1img"||quizData.type=="1q1textanswer") для удобства, потом удалить

// если все поля заполнены функция вернет true
    function checkValidForm(idx) {
        const { question, answer, wrongAnswers } = quizQuestions[idx];
    
        // Проверка на пустые поля
        return (
            question.trim() && 
            answer.trim() && 
            (!wrongAnswers || wrongAnswers.every(wrongAnswer => wrongAnswer.trim()))
        );
    }

    useEffect(() => {
        const initialQuestions = Array.from({ length: quizNums }, () => {
            if (quizData.type == "1q1img" || quizData.type == "1q1textanswer") {
                return (
                    {
                        question: "",
                        answer: "",
                    })
            } else {
                return (
                    {
                        question: "",
                        answer: "",
                        wrongAnswers: ["", "", ""],
                    })
            }
        });
        setQuizQuestions(initialQuestions);
    }, [quizNums]);
    // Функция для обновления элемента массива по индексу
    const updateQuizData = (index, updatedItem) => {
        setQuizQuestions((prevState) => {
            const newState = [...prevState];
            newState[index] = updatedItem;
            return newState;
        });
    };

    const handleQuestionChange = (newValue, index) => {
        updateQuizData(index, { ...quizQuestions[index], question: newValue });
    };

    const handleCorrectImagenChange = (newValue, index) => {
        updateQuizData(index, { ...quizQuestions[index], answer: newValue });
    };

    const handleWrongAnswerChange = (newValue, questionIndex, answerIndex) => {
        const updatedWrongAnswers = [...quizQuestions[questionIndex].wrongAnswers];
        updatedWrongAnswers[answerIndex] = newValue;
        updateQuizData(questionIndex, {
            ...quizQuestions[questionIndex],
            wrongAnswers: updatedWrongAnswers,
        });
    };
// Стиль для форм 
    const inlineStyle = {
        width: `${100 * quizNums}%`,
    };

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
    };

    function sendFormData(e) {
        e.preventDefault();

        const dataToSend = { ...quizData };
        dataToSend.questions = quizQuestions;
        console.log(dataToSend);

        axios
            .post("http://localhost:3030/api/uploadQuiz", JSON.stringify(dataToSend), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(response => {
                console.log("Сервер ответил:", response.data);
            })
            .catch((error) => {
                console.error("There was a problem with your fetch operation:", error);
            });
    }

    return (
        <div>
            <div className={classes.carouser}>
                {quizQuestions.map((el, idx) => (
                    <div key={idx} className={classes.carouserItem} onClick={(e) => setCurrentSlide(+idx)}>
                        {idx + 1}
                    </div>
                ))}
            </div>

            <div className={classes.quizFormsWrapper}>
                <div style={inlineStyle} className={classes.quizFormsContainer}>
                    {quizQuestions.map((el, idx) => (
                        <form style={activeSlide} key={idx} className={classes.quizForm}>
                            <h2>{`Форма номер ${idx + 1}`}</h2>
                            <div className={classes.inputWrapper}>
                                <input type="text" placeholder="Введите вопрос" onChange={(e) => handleQuestionChange(e.target.value, idx)} />
                            </div>

                            <div className={classes.correctAnswer}>
                                <h3>Правильный ответ</h3>
                                <MyImageInput className={classes.fileInput} type="file" placeholder="Правильный ответ" questionIndex={idx} setHeadImage={handleCorrectImagenChange} />
                            </div>
                            {(quizData.type === "1q4img" || quizData.type === "1q4textanswer") && (
                                <div className={classes.incorrectAnswersWrapper}>
                                    <h3>Неправильные ответы</h3>
                                    <div className={classes.incorrectAnswers}>
                                        <MyImageInput type="file" placeholder="НеПравильный ответ" questionIndex={idx} answerIndex={0} setHeadImage={handleWrongAnswerChange} />
                                        <MyImageInput type="file" placeholder="НеПравильный ответ" questionIndex={idx} answerIndex={1} setHeadImage={handleWrongAnswerChange} />
                                        <MyImageInput type="file" placeholder="НеПравильный ответ" questionIndex={idx} answerIndex={2} setHeadImage={handleWrongAnswerChange} />
                                    </div>
                                </div>
                            )}
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
