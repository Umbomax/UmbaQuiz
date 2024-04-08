import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import classes from "./QuizGame.module.css"

function QuizGame(props) {
    const location = useLocation();    
    const questions = location.state.questions;    
    const [currentSlide, setCurrentSlide] = useState(0);

    const inlineStyle = {
        width: `${100 * location.state.quizesCount}%`,
    };

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
    };

    function checkAnswer(answer, idx) {
        if(answer === questions[idx].answer){
            alert('Правильно')
        }
        else{
            alert('Неправильно')
        }
        
        setCurrentSlide(idx+1)
    }

    const answers = []

    questions.forEach((el, idx) => {
        answers[idx] = [...el.wrongAnswers, el.answer].sort(() => Math.random() - 0.5);
    });
    
    // const answers = [...questions[0].wrongAnswers, questions[0].answer]
    
    // const Sanswers = [...questions.wrongAnswers, ...questions.answer].sort(() => Math.random() - 0.5);

    return (
        <div className={classes.quizItemsWrapper}>
        <div style={inlineStyle} className={classes.quizItemsContainer}>
            {questions.map((question, idx) => (
                <div style={activeSlide} key={idx} className={classes.quizItem}>
                    <h1 className={classes.questionText}>{question.question}</h1>
                    <div className={classes.answersContainer}>
                    {answers[idx].map((answer) =>(
                            
                            <div className={classes.answer} onClick={(e)=>{checkAnswer(answer,idx)}}>
                                <img src={answer} alt="Вариант ответа"/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

export default QuizGame;
