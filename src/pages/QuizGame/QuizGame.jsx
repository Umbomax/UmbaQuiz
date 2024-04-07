import React, {useState} from "react";
import { useLocation } from "react-router-dom";
import classes from "./QuizGame.module.css"

function QuizGame(props) {
    const location = useLocation();
    console.log(location.state);
    const questions = location.state.questions;
    const [currentSlide, setCurrentSlide] = useState(0);

    const inlineStyle = {
        width: `${100 * location.state.quizesCount}%`,
    };

    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
    };

    function checkAnswer(answer, idx) {
        if(answer === questions.answer){
            console.log('Правильно')
        }
        else{
            console.log('Неправильно')
        }
        
        setCurrentSlide(idx+1)
    }
    // const answers = [...questions.wrongAnswers, ...questions.answer]

    const answers = [...questions.wrongAnswers, ...questions.answer].sort(() => Math.random() - 0.5);

    return (
        <div style={inlineStyle}>
            {questions.map((question, idx) => (
                <div style={activeSlide} key={idx}>
                    <h1>{question}</h1>
                    <div className={classes.answersContainer}>
                    {answers.map((answer) =>(
                            <div className={classes.answer} onClick={(e)=>{checkAnswer(answer,idx)}}>
                                <img src={answer} alt="Вариант ответа"/>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default QuizGame;
