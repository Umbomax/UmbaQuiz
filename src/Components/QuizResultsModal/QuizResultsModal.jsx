import React from "react";
import classes from "./QuizResultsModal.module.css";
import { useNavigate } from "react-router-dom";

function QuizResultsModal({ visible, setVisible, questionsCount, correctAnswersCount = 0, ...props }) {
    
    const navigate = useNavigate();
    const rootClasses = [classes.myModal];

    if (visible) {
        rootClasses.push(classes.active);
    }

    let percent = (correctAnswersCount / questionsCount) * 100;
    const resultPhrase =
        percent >= 90
            ? "Великолепно! Ты уже на вершине. Продолжай вдохновлять и радовать нас своими достижениями!"
            : percent >= 80
            ? "Отличная работа! Очень близко к успеху. Продолжай в том же темпе!"
            : percent >= 70
            ? "Прекрасная работа! Близко к отличным результатам. Продолжай в том же духе!"
            : percent >= 60
            ? "Отличная работа! Есть куда расти, но уже достигнуты хорошие результаты."
            : percent >= 50
            ? "Молодец! Ты на правильном пути. Продолжай двигаться вперед!"
            : percent >= 40
            ? "Хорошая попытка! Давай сфокусируемся на том, чтобы еще больше улучшиться."
            : percent >= 30
            ? "Не расстраивайся! Это только начало. Продолжай учиться и развиваться."
            : "Ты можешь лучше! Не сдавайся и продолжай двигаться вперед!";

    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                <h2>{`Вы ответили на ${correctAnswersCount} вопросов из ${questionsCount}.`}</h2>
                <p>{resultPhrase}</p>
                <div className={classes.controlButtonsContainer}>
                    <button onClick={() => setVisible(false)}>Просмотреть ответы</button>
                    <button onClick={() => navigate("/")}>На главную</button>
                </div>
            </div>
        </div>
    );
}

export default QuizResultsModal;
