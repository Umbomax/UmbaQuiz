import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./QuizGame.module.css";
import QuizResultsModal from "../../Components/QuizResultsModal/QuizResultsModal";

function QuizGame(props) {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [answersStatus, setAnswersStatus] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [gameEnd, setGameEnd] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const fetchedQuestions = location.state?.questions || [];
        setQuestions(fetchedQuestions);
        console.log(location.state)
        const initialAnswersStatus = new Array(fetchedQuestions.length).fill(null);
        setAnswersStatus(initialAnswersStatus);

        const generatedAnswers = fetchedQuestions.map((el) => [...el.wrongAnswers, el.answer].sort(() => Math.random() - 0.5));
        setAnswers(generatedAnswers);
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
        if (answersStatus[questionIdx] !== null) {
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
            setGameEnd(true);
            setCorrectAnswersCount(
                newAnswersStatus.reduce((acc, obj) => {
                    return obj.isCorrect ? acc + 1 : acc;
                }, 0)
            );

            setTimeout(() => setModal(true), 1000);
        }
    }

    return (
        <>
            <QuizResultsModal visible={modal} setVisible={setModal} questionsCount={questions.length} correctAnswersCount={correctAnswersCount}></QuizResultsModal>
            <div className={classes.carouser}>
                {questions.map((el, idx) => (
                    <div key={idx} className={classes.carouserItem} onClick={() => setCurrentSlide(idx)}>
                        {idx + 1}
                    </div>
                ))}
                <div style={activeCarouselBlock} className={classes.activeCarousel}></div>
            </div>

            <div className={classes.quizItemsWrapper}>
                <div style={inlineStyle} className={classes.quizItemsContainer}>
                    {questions.map((question, idx) => (
                        <div style={activeSlide} key={idx} className={classes.quizItem}>
                            <h1 className={classes.questionText}>{question.question}</h1>
                            <div className={classes.answersContainer}>
                                {question.questionImage && <img src={question.questionImage} alt="question" className={classes.questionImage} />}
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
                <button onClick={nextSlide}>Next</button>
            </div>
        </>
    );
}

export default QuizGame;
