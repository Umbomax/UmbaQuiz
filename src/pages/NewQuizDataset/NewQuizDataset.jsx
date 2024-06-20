import React, { useState, useEffect } from "react";
import classes from "./NewQuizDataset.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import MyImageInput from "../../Components/UI/MyImageInput/MyImageInput";
import axios from "axios";
import Carousel from "../../Components/Carousel/Carousel";

function NewQuizDataset({ createError }) {
    const location = useLocation();
    const quizNums = +location.state.quizesCount;
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errors, setErrors] = useState([]);
    
    const [quizData, setQuizData] = useState({
        quizName: location.state.quizName,
        quizesCount: location.state.quizesCount || 0,
        type: location.state.type,
        quizHeadImage: location.state.quizHeadImage || "noHeadImage",
        isPrivate: location.state.isPrivate || false,
        description: location.state.description || "",
        isTimed: location.state.isTimed || false,
        quizTime: location.state.quizTime || 0,
        forRegisteredUsers: location.state.forRegisteredUsers || false,
        isLimitedAttempts: location.state.isLimitedAttempts || false,
        attemptsCount: location.state.attemptsCount || 0
    });

    const [quizQuestions, setQuizQuestions] = useState([]);

    useEffect(() => {
        const initialQuestions = Array.from({ length: quizNums }, () => {
            if (quizData.type === "1q1img" || quizData.type === "1q1textanswer") {
                return {
                    question: "",
                    answer: "",
                    questionImage: ""
                };
            } else {
                return {
                    question: "",
                    answer: "",
                    wrongAnswers: ["", "", ""],
                    questionImage: ""
                };
            }
        });
        setQuizQuestions(initialQuestions);
    }, [quizNums, quizData.type]);

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
            newError = { id: generateUniqueId(), errorText: text, status: status };
        } while (errors.some(error => error.id === newError.id));
        setErrors(prevErrors => [...prevErrors, newError]);
    };

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

    const handleQuestionImageChange = (newValue, index) => {
        updateQuizData(index, { ...quizQuestions[index], questionImage: newValue });
    };

    const handleCorrectAnswerChange = (newValue, index) => {
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

    const handleImageRemoval = (questionIndex, answerIndex = null) => {
        if (answerIndex === null) {
            updateQuizData(questionIndex, { ...quizQuestions[questionIndex], questionImage: "" });
        } else {
            const updatedWrongAnswers = [...quizQuestions[questionIndex].wrongAnswers];
            updatedWrongAnswers[answerIndex] = "";
            updateQuizData(questionIndex, { ...quizQuestions[questionIndex], wrongAnswers: updatedWrongAnswers });
        }
    };

    const inlineStyle = {
        width: `${100 * quizNums}%`,
    };

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
    };

    function checkValidForm(index) {
        const q = quizQuestions[index];
        if (!q.question.trim() || !q.answer.trim()) {
            return false;
        }
        if (quizData.type === "1q4img" || quizData.type === "1q4textanswer") {
            return q.wrongAnswers.every(wrongAnswer => wrongAnswer.trim());
        }
        return true;
    }

    function sendFormData(e) {
        e.preventDefault();

        const invalidForms = quizQuestions.map((q, idx) => {
            if (!q.question.trim() || !q.answer.trim()) {
                pushStatus(`Форма номер ${idx + 1} не заполнена`, "error");
                return idx + 1;
            }
            if ((quizData.type === "1q4img" || quizData.type === "1q4textanswer") && !q.wrongAnswers.every(wrongAnswer => wrongAnswer.trim())) {
                pushStatus(`Форма номер ${idx + 1} не заполнена`, "error");
                return idx + 1;
            }
            return null;
        }).filter(x => x !== null);

        if (invalidForms.length === 0) {
            const dataToSend = { ...quizData, questions: quizQuestions };
            console.log(dataToSend);

            axios
                .post("https://umbaquizserver-production.up.railway.app/api/uploadQuiz", JSON.stringify(dataToSend), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then(response => {
                    console.log("Сервер ответил:", response.data);
                    pushStatus("Викторина успешно добавлена", "ok");
                    setTimeout( navigate('/'),1000);
                })
                .catch((error) => {
                    console.error("There was a problem with your fetch operation:", error);
                    pushStatus(`There was a problem with your fetch operation: ${error.message}`, "error");
                });
        }
    }

    return (
        <div>
            <Carousel
                items={quizQuestions}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                checkValidForm={checkValidForm}
            />

            <div className={classes.quizFormsWrapper}>
                <div style={inlineStyle} className={classes.quizFormsContainer}>
                    {quizQuestions.map((el, idx) => (
                        <form style={activeSlide} key={idx} className={classes.quizForm}>
                            <h2>{`Форма номер ${idx + 1}`}</h2>
                            <div className={classes.inputWrapper}>
                                <p>Введите текст вопроса</p>
                                <input
                                    type="text"
                                    placeholder="Введите вопрос"
                                    onChange={(e) => handleQuestionChange(e.target.value, idx)}
                                    value={quizQuestions[idx].question}
                                />
                            </div>

                            {(quizData.type === "1q4textanswer" || quizData.type === "1q1textanswer") && (
                                <div className={classes.questionImage}>
                                    <h3>Выберите изображение для вопроса</h3>
                                    <div className="my-image-input__Wrapper">
                                        <MyImageInput
                                            className={classes.fileInput}
                                            placeholder="Изображение вопроса"
                                            questionIndex={idx}
                                            setHeadImage={handleQuestionImageChange}
                                            handleImageRemoval={handleImageRemoval}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className={classes.correctAnswer}>
                                <h3>Правильный ответ</h3>
                                {(quizData.type === "1q1textanswer" || quizData.type === "1q4textanswer") ? (
                                    <input
                                        className={classes.textAnswerInput}
                                        type="text"
                                        placeholder="Правильный ответ"
                                        onChange={(e) => handleCorrectAnswerChange(e.target.value, idx)}
                                        value={quizQuestions[idx].answer}
                                    />
                                ) : (
                                    <div className="my-image-input__Wrapper">
                                        <MyImageInput
                                            className={classes.fileInput}
                                            placeholder="Правильный ответ"
                                            questionIndex={idx}
                                            setHeadImage={handleCorrectAnswerChange}
                                            handleImageRemoval={handleImageRemoval}
                                        />
                                    </div>
                                )}
                            </div>
                            {(quizData.type === "1q4img" || quizData.type === "1q4textanswer") && (
                                <div className={classes.incorrectAnswersWrapper}>
                                    <h3>Неправильные ответы</h3>
                                    <div className={classes.incorrectAnswers}>
                                        {(quizData.type === "1q4textanswer") ? (
                                            <>
                                                <input
                                                    className={classes.textAnswerInput}
                                                    type="text"
                                                    placeholder="Неправильный ответ"
                                                    onChange={(e) => handleWrongAnswerChange(e.target.value, idx, 0)}
                                                    value={quizQuestions[idx].wrongAnswers[0]}
                                                />
                                                <input
                                                    className={classes.textAnswerInput}
                                                    type="text"
                                                    placeholder="Неправильный ответ"
                                                    onChange={(e) => handleWrongAnswerChange(e.target.value, idx, 1)}
                                                    value={quizQuestions[idx].wrongAnswers[1]}
                                                />
                                                <input
                                                    className={classes.textAnswerInput}
                                                    type="text"
                                                    placeholder="Неправильный ответ"
                                                    onChange={(e) => handleWrongAnswerChange(e.target.value, idx, 2)}
                                                    value={quizQuestions[idx].wrongAnswers[2]}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <div className="my-image-input__Wrapper"><MyImageInput
                                                    placeholder="Неправильный ответ"
                                                    questionIndex={idx}
                                                    answerIndex={0}
                                                    setHeadImage={handleWrongAnswerChange}
                                                    handleImageRemoval={handleImageRemoval}
                                                /></div>

                                                <div className="my-image-input__Wrapper"><MyImageInput
                                                    placeholder="Неправильный ответ"
                                                    questionIndex={idx}
                                                    answerIndex={1}
                                                    setHeadImage={handleWrongAnswerChange}
                                                    handleImageRemoval={handleImageRemoval}
                                                /></div>

                                                <div className="my-image-input__Wrapper"><MyImageInput
                                                    placeholder="Неправильный ответ"
                                                    questionIndex={idx}
                                                    answerIndex={2}
                                                    setHeadImage={handleWrongAnswerChange}
                                                    handleImageRemoval={handleImageRemoval}
                                                /></div>

                                            </>
                                        )}
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
