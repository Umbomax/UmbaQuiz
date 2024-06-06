import React, { useState, useEffect } from "react";
import classes from "./NewQuizDataset.module.css";
import { useLocation } from "react-router-dom";
import MyImageInput from "../../Components/UI/MyImageInput/MyImageInput";
import axios from "axios";

function NewQuizDataset() {
    const location = useLocation();
    const quizNums = +location.state.quizesCount;
    const [currentSlide, setCurrentSlide] = useState(0);

    const [quizData, setQuizData] = useState({
        quizName: location.state.quizName,
        quizesCount: location.state.quizesCount,
        type: location.state.type,
        quizHeadImage: location.state.quizHeadImage,
        isPrivate: location.state.isPrivate,
        description: location.state.description,
        isTimed: location.state.isTimed,
        quizTime: location.state.quizTime,
        forRegisteredUsers: location.state.forRegisteredUsers,
        isLimitedAttempts: location.state.isLimitedAttempts,
        attemptsCount: location.state.attemptsCount
    });

    const [quizQuestions, setQuizQuestions] = useState([]);

    useEffect(() => {
        const initialQuestions = Array.from({ length: quizNums }, () => {
            if (quizData.type === "1q1img" || quizData.type === "1q1textanswer") {
                return {
                    question: "",
                    answer: "",
                };
            } else {
                return {
                    question: "",
                    answer: "",
                    wrongAnswers: ["", "", ""],
                };
            }
        });
        setQuizQuestions(initialQuestions);
    }, [quizNums, quizData.type]);

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

    const handleCorrectImageChange = (newValue, index) => {
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
                return idx + 1;
            }
            if ((quizData.type === "1q4img" || quizData.type === "1q4textanswer") && !q.wrongAnswers.every(wrongAnswer => wrongAnswer.trim())) {
                return idx + 1;
            }
            return null;
        }).filter(x => x !== null);

        if (invalidForms.length > 0) {
            alert(`Не заполнены следующие формы: ${invalidForms.join(', ')}`);
        } else {
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
                })
                .catch((error) => {
                    console.error("There was a problem with your fetch operation:", error);
                });
        }
    }

    return (
        <div>
            <div className={classes.carouser}>
                {quizQuestions.map((el, idx) => (
                    <div 
                        key={idx} 
                        className={`${classes.carouserItem} ${checkValidForm(idx) ? classes.green : ''}`} 
                        onClick={() => setCurrentSlide(idx)}
                    >
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
                                <input 
                                    type="text" 
                                    placeholder="Введите вопрос" 
                                    onChange={(e) => handleQuestionChange(e.target.value, idx)} 
                                    value={quizQuestions[idx].question}
                                />
                            </div>

                            <div className={classes.correctAnswer}>
                                <h3>Правильный ответ</h3>
                                <MyImageInput 
                                    className={classes.fileInput} 
                                    type="file" 
                                    placeholder="Правильный ответ" 
                                    questionIndex={idx} 
                                    setHeadImage={handleCorrectImageChange} 
                                />
                            </div>
                            {(quizData.type === "1q4img" || quizData.type === "1q4textanswer") && (
                                <div className={classes.incorrectAnswersWrapper}>
                                    <h3>Неправильные ответы</h3>
                                    <div className={classes.incorrectAnswers}>
                                        <MyImageInput 
                                            type="file" 
                                            placeholder="НеПравильный ответ" 
                                            questionIndex={idx} 
                                            answerIndex={0} 
                                            setHeadImage={handleWrongAnswerChange} 
                                        />
                                        <MyImageInput 
                                            type="file" 
                                            placeholder="НеПравильный ответ" 
                                            questionIndex={idx} 
                                            answerIndex={1} 
                                            setHeadImage={handleWrongAnswerChange} 
                                        />
                                        <MyImageInput 
                                            type="file" 
                                            placeholder="НеПравильный ответ" 
                                            questionIndex={idx} 
                                            answerIndex={2} 
                                            setHeadImage={handleWrongAnswerChange} 
                                        />
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
