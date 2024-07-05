import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import classes from "./QuizGame.module.css";
import QuizResultsModal from "../../Components/QuizResultsModal/QuizResultsModal";
import Timer from "../../Components/Timer/Timer";
import noImage from '../../assets/images/no_image.jpg'; 
import Carousel from "../../Components/Carousel/Carousel";

function QuizGame(props) {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [answersStatus, setAnswersStatus] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [gameEnd, setGameEnd] = useState(false);
    const [modal, setModal] = useState(false);
    const [quizStartTime, setQuizStartTime] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchedQuestions = location.state?.questions || [];
        setQuestions(fetchedQuestions);
        const initialAnswersStatus = new Array(fetchedQuestions.length).fill(null);
        setAnswersStatus(initialAnswersStatus);

        // Generate answers
        const generatedAnswers = fetchedQuestions.map((el, index) => {
            let wrongAnswers = [...el.wrongAnswers];
            if (location.state.type === "1q1textanswer" || location.state.type === "1q1img") {
                fetchedQuestions.forEach((question, qIdx) => {
                    if (qIdx !== index && wrongAnswers.length < 3) {
                        wrongAnswers.push(question.answer);
                    }
                });
                wrongAnswers = [...new Set(wrongAnswers)].slice(0, 3);
            }
            return [...wrongAnswers, el.answer].sort(() => Math.random() - 0.5);
        });

        setAnswers(generatedAnswers);
        
        const token = localStorage.getItem('token');
        const quizId = location.state._id;
        const quizStartTime = Date.now();
        setQuizStartTime(quizStartTime);

        if (token) {    
            const decoded = jwtDecode(token);
            const userId = decoded.id;
            console.log('Data for sending');
            console.log({ userId, quizStartTime, quizId });
            axios.post(`${apiUrl}/startQuiz`, { userId, quizStartTime, quizId })
            // axios.post("http://localhost:3030/api/startQuiz", { userId, quizStartTime, quizId })
                .catch(error => console.error("Error starting quiz:", error));
        } else {
            console.log({ quizStartTime, quizId });
            // axios.post("http://localhost:3030/api/startQuiz", { quizStartTime, quizId })
            axios.post(`${apiUrl}/startQuiz`, { quizStartTime, quizId })
                .catch(error => console.error("Error starting quiz:", error));
        }
    }, [location.state]);

    function setCarouserActive() {
        const STEP_LENGTH = 55; // Ширина блока + gap
        const startPos = -STEP_LENGTH * Math.floor(questions.length / 2);
        return startPos + STEP_LENGTH * currentSlide;
    }

    const activeCarouselBlock = {
        transform: `translateX(${setCarouserActive()}px)`,
    };

    const inlineStyle = {
        width: `${100 * location.state.quizesCount}%`,
    };

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
    };

    function nextSlide(e) {
        e.preventDefault();
        setCurrentSlide((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
    }

    function prevSlide(e) {
        e.preventDefault();
        setCurrentSlide((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
    }

    function checkAnswer(answer, questionIdx, answerIdx) {
        if (gameEnd || answersStatus[questionIdx] !== null) {
            return;
        }
        const isCorrect = answer === questions[questionIdx].answer;
        const newAnswersStatus = [...answersStatus];
        const correctAnswerIdx = answers[questionIdx].findIndex((ans) => ans === questions[questionIdx].answer);
        newAnswersStatus[questionIdx] = {
            selectedAnswerIdx: answerIdx,
            correctAnswerIdx: correctAnswerIdx,
            isCorrect: isCorrect,
        };

        setAnswersStatus(newAnswersStatus);
        const nullIndex = newAnswersStatus.findIndex((status) => status === null);
        
        if (nullIndex === -1) {
            endGame(newAnswersStatus);
        }
    }

    function endGame(finalAnswersStatus) {
        setGameEnd(true);
        const filteredStatus = finalAnswersStatus.filter(status => status !== null);
        const correctCount = filteredStatus.reduce((acc, obj) => {
            return obj.isCorrect ? acc + 1 : acc;
        }, 0);
        setCorrectAnswersCount(correctCount);
        setTimeout(() => setModal(true), 1000);

        // Отправка данных на сервер по окончании викторины
        const token = localStorage.getItem('token');
        const quizId = location.state._id;
        const quizEndTime = Date.now();
        const result = correctCount;

        if (token) {
            const decoded = jwtDecode(token);
            const userId = decoded.id;
            console.log({ userId, quizStartTime, quizEndTime, quizId, result,});
            axios.post(`${apiUrl}/endQuiz`, { userId, quizStartTime, quizEndTime, quizId, result })
                .catch(error => console.error("Error ending quiz:", error));
        }
    }

    function checkValidForm() {
        return true;
    }

    function handleTimeEnd() {
        endGame(answersStatus);
    }

    return (
        <>
            <QuizResultsModal visible={modal} setVisible={setModal} questionsCount={questions.length} correctAnswersCount={correctAnswersCount}></QuizResultsModal>
            <Carousel
                items={questions}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                checkValidForm={checkValidForm}
                isQuizGame={true}
                answersStatus={answersStatus}
            />

            <div className={classes.quizItemsWrapper}>
                <div style={inlineStyle} className={classes.quizItemsContainer}>
                    {questions.map((question, idx) => (
                        <div style={activeSlide} key={idx} className={classes.quizItem}>
                            <h1 className={classes.questionText}>{question.question}</h1>
                            <div className={classes.answersContainer}>
                                <img 
                                    src={question.questionImage || noImage} 
                                    alt="question" 
                                    className={classes.questionImage} 
                                />
                                {location.state.type === "1q4textanswer" || location.state.type === "1q1textanswer" ? (
                                    <div className={classes.textAnswers}>
                                        {answers[idx].map((answer, answerIdx) => (
                                            <div
                                                key={answerIdx}
                                                className={`${classes.answer} ${
                                                    answersStatus[idx]?.isCorrect === false && answerIdx === answersStatus[idx].correctAnswerIdx
                                                        ? classes.correct
                                                        : answersStatus[idx]?.isCorrect === false && answerIdx === answersStatus[idx].selectedAnswerIdx
                                                        ? classes.incorrect
                                                        : answersStatus[idx]?.isCorrect === true && answerIdx === answersStatus[idx].selectedAnswerIdx
                                                        ? classes.correct
                                                        : ""
                                                }`}
                                                onClick={() => checkAnswer(answer, idx, answerIdx)}
                                            >
                                                {answer}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    answers[idx].map((answer, answerIdx) => (
                                        <div
                                            key={answerIdx}
                                            className={`${classes.answer} ${
                                                answersStatus[idx]?.isCorrect === false && answerIdx === answersStatus[idx].correctAnswerIdx
                                                    ? classes.correct
                                                    : answersStatus[idx]?.isCorrect === false && answerIdx === answersStatus[idx].selectedAnswerIdx
                                                    ? classes.incorrect
                                                    : answersStatus[idx]?.isCorrect === true && answerIdx === answersStatus[idx].selectedAnswerIdx
                                                    ? classes.correct
                                                    : ""
                                            }`}
                                            onClick={() => checkAnswer(answer, idx, answerIdx)}
                                        >
                                            <img src={answer} alt="answer" />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={classes.controlsContainer}>
                <button onClick={prevSlide}>Previous</button>
                {location.state.isTimed && !gameEnd && <Timer quizTime={location.state.quizTime} onTimeEnd={handleTimeEnd} />}
                {gameEnd && <button onClick={() => setModal(true)}>Return to Results</button>}
                <button onClick={nextSlide}>Next</button>
            </div>
        </>
    );
}

export default QuizGame;
