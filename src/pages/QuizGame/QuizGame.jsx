import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./QuizGame.module.css";
import QuizResultsModal from "../../Components/QuizResultsModal/QuizResultsModal";

function QuizGame(props) {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [correctAnsersCount, setCorrectAnsersCount] = useState(0);
    const [answersStatus, setAnswersStatus] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [gameEnd, setGameEnd] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const fetchedQuestions = location.state?.questions || [];
        setQuestions(fetchedQuestions);

        const initialAnswersStatus = new Array(fetchedQuestions.length).fill(null);
        setAnswersStatus(initialAnswersStatus);

        const generatedAnswers = fetchedQuestions.map((el) => [...el.wrongAnswers, el.answer].sort(() => Math.random() - 0.5));
        setAnswers(generatedAnswers);
    }, [location.state]);



    function setCarouserActive() {
        const isOdd = questions.length % 2 === 0;
        const STEP_LENGTH = 65; // Ширина блока + gap
        let startPos = isOdd ? 32.5 - STEP_LENGTH * (questions.length / 2) : 0 - STEP_LENGTH * Math.round(questions.length / 2);
        return startPos + 65 * currentSlide;
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
        currentSlide === questions.length - 1 ? setCurrentSlide(0) : setCurrentSlide(currentSlide + 1);
    }

    function prevSlide(e) {
        e.preventDefault();
        currentSlide === 0 ? setCurrentSlide(questions.length - 1) : setCurrentSlide(currentSlide - 1);
    }

    function checkAnswer(answer, questionIdx, answerIdx) {
        if (answersStatus[questionIdx] !== null) {
            return;
        }
        const isCorrect = answer === questions[questionIdx].answer;
        const newAnswersStatus = [...answersStatus]; // Создаем копию массива
        const correctAnswerIdx = answers[questionIdx].findIndex((ans) => ans === questions[questionIdx].answer);
        newAnswersStatus[questionIdx] = {
            // Обновляем элемент массива по индексу idx
            selectedAnswerIdx: answerIdx,
            correctAnswerIdx: correctAnswerIdx,
            isCorrect: isCorrect,
        };

        setAnswersStatus(newAnswersStatus);
        const nullIndex = newAnswersStatus.findIndex((status) => status === null);
        
        // проверяем статус окончания игры
        // console.log(newAnswersStatus)
        if (nullIndex === -1) {
            setGameEnd(true)
            setCorrectAnsersCount(
                newAnswersStatus.reduce((acc, obj) => {
                    return obj.isCorrect ? acc + 1 : acc;
                }, 0)
            );

            setTimeout(() => setModal(true), 1000);
        }
    }

    return (
        <>
            <QuizResultsModal visible={modal} setVisible={setModal} questionsCount={questions.length} correctAnsersCount={correctAnsersCount}></QuizResultsModal>
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
                                        <img src={answer} alt="Вариант ответа" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.controlsContainer}>
                <button onClick={(e) => prevSlide(e)}>Предыдущий</button>
                {gameEnd?(<button onClick={(e) => setModal(true)}>Показать результат</button>):null}
                <button onClick={(e) => nextSlide(e)}>Следующий</button>
            </div>
        </>
    );
}

export default QuizGame;
