import React, { useState, useEffect } from "react";
import classes from "./CreateQuizPage.module.css";
import ModalCreateQuiz from "../../Components/ModalCreateQuiz/ModalCreateQuiz";

function CreateQuizPage({ createError }) {
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [quizType, setQuizType] = useState("");

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
                datatype="1q4img"
                onClick={() => {
                    setModal(true);
                    setQuizType("1q4img");
                    setTitle('На вопрос 4 изображения')
                }}
            >
                <h3>На вопрос 4 изображения</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 изображений. На каждый вопрос выбираются 4 изображения
                </p>
            </div>
            <div className={classes.card} datatype="1q1img"
                onClick={() => {
                    setModal(true);
                    setQuizType("1q1img");
                    setTitle('На вопрос 1 изображение')
                }}>
                <h3>На вопрос 1 изображение</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 изображений. либо на каждый вопрос добавляется единственное изображение, а 3 других изображения будут выбраны случайно (для данной викторины необходимо минимум 4 вопроса)
                </p>
            </div>
            <div className={classes.card}
                datatype="1q4textanswer"
                onClick={() => {
                    setModal(true);
                    setQuizType("1q4textanswer");
                    setTitle('На вопрос 4 текстовых ответа')
                }}>
                <h3>На вопрос 4 текстовых ответа</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 текстовых блоков. На вопрос необходимо ввести 4 ответа.
                </p>
            </div>
            <div className={classes.card}
                datatype="1q1textanswer"
                onClick={() => {
                    setModal(true);
                    setQuizType("1q1textanswer");
                    setTitle('На вопрос 1 текстовый ответ')
                }}>
                <h3>На вопрос 1 текстовый ответ</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 текстовых блоков. На вопрос предоставляется один ответ, оставшиеся 3 варианта добавляются автоматически. (Для данной викторины необходимо минимум 4 вопроса).
                </p>
            </div>
        </div>
    );
}

export default CreateQuizPage;
