import React, { useState } from "react";
import classes from "./CreateQuizPage.module.css";
import ModalCreateQuiz from "../../Components/ModalCreateQuiz/ModalCreateQuiz";
import VideoSection from "../../Components/VideoSection/VideoSection";

function CreateQuizPage({ createError }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [quizType, setQuizType] = useState("");
    const [hoveredCard, setHoveredCard] = useState(null);

    const quizTypes = [
        { type: "1q4img", title: "На вопрос 4 изображения", description: "Создайте вопрос с одним правильным и тремя неправильными изображениями.", label: "4 изображения" },
        { type: "1q1img", title: "На вопрос 1 изображение", description: "Создайте вопрос с одним правильным изображением. Остальные ответы будут взяты из других вопросов.", label: "1 изображение" },
        { type: "1q4textanswer", title: "На вопрос 4 текстовых ответа", description: "Создайте вопрос с одним правильным и тремя неправильными текстовыми ответами.", label: "4 текста" },
        { type: "1q1textanswer", title: "На вопрос 1 текстовый ответ", description: "Создайте вопрос с одним правильным текстовым ответом. Остальные ответы будут взяты из других вопросов.", label: "1 текст" },
    ];

    return (
        <div className={classes.chooseType}>
            <ModalCreateQuiz visible={modal} setVisible={setModal} quizType={quizType} createError={createError} title={title} />
            {quizTypes.map(({ type, title, description, label }) => (
                <div
                    key={type}
                    className={classes.card}
                    onMouseEnter={() => setHoveredCard(type)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => {
                        setModal(true);
                        setQuizType(type);
                        setTitle(title);
                    }}
                >
                    <h3 className={classes.description}>{label}</h3>
                    <p className={classes.description}>{description}</p>
                    {/* {hoveredCard === type && <VideoSection videoId="85pqFHx0FiU" />} */}
                </div>
            ))}
        </div>
    );
}

export default CreateQuizPage;
