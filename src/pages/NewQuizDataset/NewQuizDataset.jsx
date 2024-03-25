import React, { useState } from "react";
import classes from "./NewQuizDataset.module.css";
import { useLocation } from "react-router-dom";


function NewQuizDataset() {
    const location = useLocation();
    const { state } = location;
    const quizNums = state.quizesCount
    console.log(quizNums)
    const [currentSlide, setCurrentSlide] = useState(0)
    const arr = Array(+state.quizesCount).fill(null)
    console.log(arr)

    const inlineStyle = {
        width: `${100 * quizNums}%`,
        // transform: `translateX(${100*currentSlide}%)`
    }
    const activeSlide = {
        transform: `translateX(${-100*currentSlide}%)`
    }

    return (
        <div>
            <div className={classes.carouser}>
                {arr.map((el, idx) => (
                    <div key={idx} className={classes.carouserItem} onClick={(e)=>setCurrentSlide(+idx)}>{idx+1}</div>
                ))}
            </div>

            <div className={classes.quizFormsWrapper}>
                <div style={inlineStyle} className={classes.quizFormsContainer}>
                    {arr.map((el, idx) => (
                        <form style={activeSlide} key={idx} className={classes.quizForm}>
                            <h2>{`Форма номер ${idx+1}`}</h2>
                            <input type="text" placeholder="Введите вопрос" />
                            <div className={classes.correctAnswer}>
                                <input type="file" placeholder="Правильный ответ" />
                            </div>
                            <div className={classes.incorrectAnswers}>
                                <input type="file" placeholder="НеПравильный ответ" />
                                <input type="file" placeholder="НеПравильный ответ" />
                                <input type="file" placeholder="НеПравильный ответ" />
                            </div>
                        </form>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default NewQuizDataset;