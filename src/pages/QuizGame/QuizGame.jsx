import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import classes from "./QuizGame.module.css";
import QuizResultsModal from "../../Components/QuizResultsModal/QuizResultsModal";
import ImageContainer from "../../Components/ImageContainer/ImageContainer";
import Timer from "../../Components/Timer/Timer";

import Carousel from "../../Components/Carousel/Carousel";

function QuizGame(props) {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [answersStatus, setAnswersStatus] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [gameEnd, setGameEnd] = useState(false);
    const [modal, setModal] = useState(false);
    const [quizStartTime, setQuizStartTime] = useState(null);
    const [slides, setSlides] = useState([]);
    const [transitioning, setTransitioning] = useState(false); // Added for animation
    const [animationTime, setAnimationTime] = useState(0.6);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchedQuestions = location.state?.questions || [];
        setQuestions(fetchedQuestions);
        setSlides([fetchedQuestions[fetchedQuestions.length - 1], ...fetchedQuestions, fetchedQuestions[0]]);
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
                .catch(error => console.error("Error starting quiz:", error));
        } else {
            console.log({ quizStartTime, quizId });
            axios.post(`${apiUrl}/startQuiz`, { quizStartTime, quizId })
                .catch(error => console.error("Error starting quiz:", error));
        }
    }, [location.state]);


    const inlineStyle = {
        width: `${100 * (questions.length + 2)}%`, 
    };

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
        transition: transitioning ? `transform ${animationTime}s cubic-bezier(0.5, 0, 0.5, 1)` : 'none',
    };

    function nextSlide(e) {
        e.preventDefault();
        if (transitioning) return;
        setTransitioning(true);
        setCurrentSlide((prev) => prev + 1);
    }

    function prevSlide(e) {
        e.preventDefault();
        if (transitioning) return;
        setTransitioning(true);
        setCurrentSlide((prev) => prev - 1);
    }

    useEffect(() => {
        if (!transitioning) return;
        
        const handleTransitionEnd = () => {
            if (currentSlide === slides.length - 1) {
                setCurrentSlide(slides.length - 1); // Установить на последний слайд (невидимый)
                setTimeout(() => {
                    setTransitioning(false);
                    setCurrentSlide(0); // Перейти к первому слайду (невидимый)
                    setTimeout(() => {
                        setTransitioning(true);
                        setCurrentSlide(1); // Перейти к первому слайду (видимый)
                    }, 200); // Время для завершения перехода с последнего на первый
                }, 200); // Время для завершения перехода с последнего на первый
            } else if (currentSlide === 0) {
                setCurrentSlide(0); // Установить на первый слайд (невидимый)
                setTimeout(() => {
                    setTransitioning(false);
                    setCurrentSlide(slides.length - 1); // Перейти к последнему слайду (невидимый)
                    setTimeout(() => {
                        setTransitioning(true);
                        setCurrentSlide(slides.length - 2); // Перейти к последнему слайду (видимый)
                    }, 200); // Время для завершения перехода с первого на последний
                }, 200); // Время для завершения перехода с первого на последний
            } else {
                setTransitioning(false);
            }
        };
    
        const transitionTime = (currentSlide === slides.length - 1 || currentSlide === 0) ? 100 : 600;
        const timer = setTimeout(handleTransitionEnd, transitionTime);
    
        return () => clearTimeout(timer);
    }, [currentSlide, transitioning, slides.length]);
    


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
                    {slides.map((question, idx) => (
                        <div style={activeSlide} key={idx} className={`${classes.quizItem} ${classes.carousel_item}`}>
                            {idx > 0 && idx < slides.length - 1 && (
                                <>
                                    <h1 className={classes.questionText}>{question.question}</h1>
                                    <div className={classes.answersContainer}>
                                        <div className={classes.questionForQuiz}>
                                            <ImageContainer src={question.questionImage} altName={"question"}></ImageContainer>
                                        </div>

                                        <div className={`${classes.answersWrapper} ${location.state.type === "1q4textanswer" || location.state.type === "1q1textanswer" ? classes.notGrid:""}`}>
                                            {location.state.type === "1q4textanswer" || location.state.type === "1q1textanswer" ? (
                                                <div className={classes.textAnswers}>
                                                    {answers[idx - 1].map((answer, answerIdx) => (
                                                        <div
                                                            key={answerIdx}
                                                            onClick={() => checkAnswer(answer, idx - 1, answerIdx)}
                                                            className={`${classes.textAnswer} ${
                                                                answersStatus[idx - 1]?.selectedAnswerIdx === answerIdx
                                                                    ? answersStatus[idx - 1]?.isCorrect
                                                                        ? classes.correctAnswer
                                                                        : classes.incorrectAnswer
                                                                    : ""
                                                            }`}
                                                        >
                                                            {answer}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className={classes.answersGrid}>
                                                    {answers[idx - 1].map((answer, answerIdx) => (
                                                        <div
                                                            key={answerIdx}
                                                            onClick={() => checkAnswer(answer, idx - 1, answerIdx)}
                                                            className={`${classes.answer} ${
                                                                answersStatus[idx - 1]?.selectedAnswerIdx === answerIdx
                                                                    ? answersStatus[idx - 1]?.isCorrect
                                                                        ? classes.correctAnswer
                                                                        : classes.incorrectAnswer
                                                                    : ""
                                                            }`}
                                                        >
                                                            <ImageContainer src={answer} altName={"answer"}></ImageContainer>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
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
