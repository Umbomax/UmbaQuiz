import React, { useState, useEffect } from "react";
import classes from "./CreateQuizPage.module.css";
import ModalCreateQuiz from "../../Components/ModalCreateQuiz/ModalCreateQuiz";
import VideoSection from "../../Components/VideoSection/VideoSection";

function CreateQuizPage({ createError }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [quizType, setQuizType] = useState("");
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const savedModalState = localStorage.getItem('modalState');
        const savedQuizType = localStorage.getItem('quizType');
        if (savedModalState) {
            setModal(JSON.parse(savedModalState));
        }
        if (savedQuizType) {
            setQuizType(savedQuizType);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('modalState', JSON.stringify(modal));
        localStorage.setItem('quizType', quizType);
    }, [modal, quizType]);

    return (
        <div className={classes.chooseType}>
            <ModalCreateQuiz visible={modal} setVisible={setModal} quizType={quizType} createError={createError} title={title} />
            <div
                className={classes.card}
                onMouseEnter={() => setHoveredCard("1q4img")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                    setModal(true);
                    setQuizType("1q4img");
                    setTitle('На вопрос 4 изображения');
                }}
            >
                <h3>4 изображения</h3>
                <p className={classes.description}>
                    Создайте вопрос с одним правильным и тремя неправильными изображениями.
                </p>
                {hoveredCard === "1q4img" && <VideoSection videoId="85pqFHx0FiU" />}
            </div>
            <div
                className={classes.card}
                onMouseEnter={() => setHoveredCard("1q1img")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                    setModal(true);
                    setQuizType("1q1img");
                    setTitle('На вопрос 1 изображение');
                }}
            >
                <h3>1 изображение</h3>
                <p className={classes.description}>
                    Создайте вопрос с одним правильным изображением. Остальные ответы будут взяты из других вопросов.
                </p>
                {hoveredCard === "1q1img" && <VideoSection videoId="85pqFHx0FiU" />}
            </div>
            <div
                className={classes.card}
                onMouseEnter={() => setHoveredCard("1q4textanswer")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                    setModal(true);
                    setQuizType("1q4textanswer");
                    setTitle('На вопрос 4 текстовых ответа');
                }}
            >
                <h3>4 текста</h3>
                <p className={classes.description}>
                    Создайте вопрос с одним правильным и тремя неправильными текстовыми ответами.
                </p>
                {hoveredCard === "1q4textanswer" && <VideoSection videoId="85pqFHx0FiU" />}
            </div>
            <div
                className={classes.card}
                onMouseEnter={() => setHoveredCard("1q1textanswer")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                    setModal(true);
                    setQuizType("1q1textanswer");
                    setTitle('На вопрос 1 текстовый ответ');
                }}
            >
                <h3>1 текст</h3>
                <p className={classes.description}>
                    Создайте вопрос с одним правильным текстовым ответом. Остальные ответы будут взяты из других вопросов.
                </p>
                
                {hoveredCard === "1q1textanswer" && <VideoSection videoId="85pqFHx0FiU" />}
                <button>Начать</button>
            </div>
        </div>
    );
}

export default CreateQuizPage;
