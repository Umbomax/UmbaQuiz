import React, { useState, useEffect } from "react";
import classes from "./NewQuizDataset.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import MyImageInput from "../../Components/UI/MyImageInput/MyImageInput";
import axios from "axios";
import Carousel from "../../Components/Carousel/Carousel";
import ModalCreateQuiz from "../../Components/ModalCreateQuiz/ModalCreateQuiz";
import { useSwipeable } from "react-swipeable";

function NewQuizDataset({ createError }) {
    const location = useLocation();
    const quizNums = +location.state.quizesCount;
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errors, setErrors] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
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
        attemptsCount: location.state.attemptsCount || 0,
    });

    const [quizQuestions, setQuizQuestions] = useState([]);

    useEffect(() => {
        const initialQuestions = Array.from({ length: quizNums }, () => {
            if (quizData.type === "1q1img" || quizData.type === "1q1textanswer") {
                return {
                    question: "",
                    answer: "",
                    questionImage: "",
                };
            } else {
                return {
                    question: "",
                    answer: "",
                    wrongAnswers: ["", "", ""],
                    questionImage: "",
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
        } while (errors.some((error) => error.id === newError.id));
        setErrors((prevErrors) => [...prevErrors, newError]);
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
    const handleImageRemoval = (questionIndex, answerIndex) => {
        const updatedQuizQuestions = [...quizQuestions];
        if (answerIndex === undefined) {
            updatedQuizQuestions[questionIndex].questionImage = "";
        } else {
            if (answerIndex === -1) {
                updatedQuizQuestions[questionIndex].answer = "";
            } else {
                updatedQuizQuestions[questionIndex].wrongAnswers[answerIndex] = "";
            }
        }
        setQuizQuestions(updatedQuizQuestions);
    };

    const [inlineStyle, setInlineStyle] = useState({
        width: `${100 * quizNums}%`,
    });

    useEffect(() => {
        setInlineStyle({
            width: `${100 * quizData.quizesCount}%`,
        });
    }, [quizData.quizesCount]);

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
    };

    function checkValidForm(index) {
        const q = quizQuestions[index];
        if (!q.question.trim() || !q.answer.trim()) {
            return false;
        }
        if (quizData.type === "1q4img" || quizData.type === "1q4textanswer") {
            return q.wrongAnswers.every((wrongAnswer) => wrongAnswer.trim());
        }
        return true;
    }

    function sendFormData(e) {
        e.preventDefault();
        const invalidForms = quizQuestions
            .map((q, idx) => {
                if (!q.question.trim() || !q.answer.trim()) {
                    pushStatus(`Форма номер ${idx + 1} не заполнена`, "error");
                    return idx + 1;
                }
                if ((quizData.type === "1q4img" || quizData.type === "1q4textanswer") && !q.wrongAnswers.every((wrongAnswer) => wrongAnswer.trim())) {
                    pushStatus(`Форма номер ${idx + 1} не заполнена`, "error");
                    return idx + 1;
                }
                return null;
            })
            .filter((x) => x !== null);

        if (invalidForms.length === 0) {
            const dataToSend = { ...quizData, questions: quizQuestions };

            axios
                .post(`${apiUrl}/uploadQuiz`, JSON.stringify(dataToSend), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    console.log("Сервер ответил:", response.data);
                    pushStatus("Викторина успешно добавлена", "ok");
                    setTimeout(() => navigate("/"), 1000);
                })
                .catch((error) => {
                    console.error("There was a problem with your fetch operation:", error);
                    pushStatus(`There was a problem with your fetch operation: ${error.message}`, "error");
                });
        }
    }

    const handleEditTemplate = () => {
        setIsEditing(true);
        setModalVisible(true);
    };

    const handleTemplateChange = (updatedQuizData) => {
        setQuizData(updatedQuizData);

        const updatedQuizQuestions = [...quizQuestions];

        if (updatedQuizData.quizesCount > quizQuestions.length) {
            for (let i = quizQuestions.length; i < updatedQuizData.quizesCount; i++) {
                if (quizData.type === "1q1img" || quizData.type === "1q1textanswer") {
                    updatedQuizQuestions.push({
                        question: "",
                        answer: "",
                        questionImage: "",
                    });
                } else {
                    updatedQuizQuestions.push({
                        question: "",
                        answer: "",
                        wrongAnswers: ["", "", ""],
                        questionImage: "",
                    });
                }
            }
        } else if (updatedQuizData.quizesCount < quizQuestions.length) {
            updatedQuizQuestions.splice(updatedQuizData.quizesCount);
        }

        setQuizQuestions(updatedQuizQuestions);
    };

    const setHeadImage = (imageUri, questionIndex, answerIndex) => {
        const updatedQuizQuestions = [...quizQuestions];
        if (answerIndex === undefined) {
            updatedQuizQuestions[questionIndex].questionImage = imageUri;
        } else {
            if (answerIndex === -1) {
                updatedQuizQuestions[questionIndex].answer = imageUri;
            } else {
                updatedQuizQuestions[questionIndex].wrongAnswers[answerIndex] = imageUri;
            }
        }
        setQuizQuestions(updatedQuizQuestions);
    };

    const nextSlide = () => {
        if (currentSlide < quizQuestions.length - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => nextSlide(),
        onSwipedRight: () => prevSlide(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    return (
        <div>
            <Carousel
                items={quizQuestions}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                checkValidForm={checkValidForm}
                setTransitioning={() => {}}
                isQuizGame={false}
                answersStatus={[]}
            />

            <div className={classes.quizFormsWrapper}>
                <div style={inlineStyle} className={classes.quizFormsContainer}>
                    {quizQuestions.map((el, idx) => (
                        <form style={activeSlide} key={idx} className={classes.quizForm} {...swipeHandlers}>
                            <h2>{`Форма номер ${idx + 1}`}</h2>
                            <div className={classes.inputWrapper}>
                                <p>Введите текст вопроса</p>
                                <input type="text" placeholder="Введите вопрос" onChange={(e) => handleQuestionChange(e.target.value, idx)} value={quizQuestions[idx].question} />
                            </div>

                            {(quizData.type === "1q4textanswer" || quizData.type === "1q1textanswer") && (
                                <>
                                    <div className={classes.inputWrapper}>
                                        <p>Введите правильный ответ</p>
                                        <input type="text" placeholder="Введите правильный ответ" onChange={(e) => handleCorrectAnswerChange(e.target.value, idx)} value={quizQuestions[idx].answer} />
                                    </div>
                                    {quizData.type === "1q4textanswer" &&
                                        quizQuestions[idx].wrongAnswers.map((answer, i) => (
                                            <div key={i} className={classes.inputWrapper}>
                                                <p>{`Введите неправильный ответ ${i + 1}`}</p>
                                                <input
                                                    type="text"
                                                    placeholder={`Введите неправильный ответ ${i + 1}`}
                                                    onChange={(e) => handleWrongAnswerChange(e.target.value, idx, i)}
                                                    value={quizQuestions[idx].wrongAnswers[i]}
                                                />
                                            </div>
                                        ))}
                                </>
                            )}

                            {(quizData.type === "1q4img" || quizData.type === "1q1img") && (
                                <>
                                    <div className={classes.inputWrapper}>
                                        <p>Загрузите правильный ответ</p>
                                        <MyImageInput
                                            name="answer"
                                            setHeadImage={setHeadImage}
                                            questionIndex={idx}
                                            answerIndex={-1}
                                            initialImage={quizQuestions[idx].answer}
                                            handleImageRemoval={handleImageRemoval}
                                        />
                                    </div>
                                    {quizData.type === "1q4img" &&
                                        quizQuestions[idx].wrongAnswers.map((answer, i) => (
                                            <div key={i} className={classes.inputWrapper}>
                                                <p>{`Загрузите неправильный ответ ${i + 1}`}</p>
                                                <MyImageInput
                                                    name={`wrongAnswer${i}`}
                                                    setHeadImage={setHeadImage}
                                                    questionIndex={idx}
                                                    answerIndex={i}
                                                    initialImage={quizQuestions[idx].wrongAnswers[i]}
                                                    handleImageRemoval={handleImageRemoval}
                                                />
                                            </div>
                                        ))}
                                </>
                            )}

                            <div className={classes.inputWrapper}>
                                <p>Загрузите изображение вопроса</p>
                                <MyImageInput
                                    name="questionImage"
                                    setHeadImage={setHeadImage}
                                    questionIndex={idx}
                                    initialImage={quizQuestions[idx].questionImage}
                                    handleImageRemoval={handleImageRemoval}
                                />
                            </div>
                        </form>
                    ))}
                </div>
            </div>

            <div className={classes.btnWrapper}>
                <button className={classes.actionBtn} onClick={prevSlide} disabled={currentSlide === 0}>
                    Назад
                </button>
                <button className={classes.actionBtn} onClick={nextSlide} disabled={currentSlide === quizQuestions.length - 1}>
                    Вперед
                </button>
                <button className={classes.actionBtn} onClick={sendFormData}>
                    Создать
                </button>
                <button className={classes.actionBtn} onClick={handleEditTemplate}>
                    Изменить шаблон
                </button>
            </div>

            {modalVisible && <ModalCreateQuiz visible={modalVisible} setVisible={setModalVisible} initialData={quizData} isEditing={isEditing} onSubmit={handleTemplateChange} />}
        </div>
    );
}

export default NewQuizDataset;
