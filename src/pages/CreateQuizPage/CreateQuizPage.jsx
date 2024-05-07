import React from "react";
import classes from "./CreateQuizPage.module.css";
import ModalCreateQuiz from "../../Components/ModalCreateQuiz/ModalCreateQuiz";
import { useEffect, useState } from "react";

function CreateQuizPage() {
    const [modal, setModal] = useState(false);
    const [quizType, setquizType] = useState("");

    return (
        <div className={classes.chooseType}>
            <ModalCreateQuiz visible={modal} setVisible={setModal} quizType={quizType} />
            <div
                className={classes.card}
                datatype="1q4img"
                onClick={(e) => {
                    setModal(true);
                    setquizType("1q4img");
                }}
            >
                <h3>На вопрос 4 изображения</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 изображений. На каждый вопрос выбираются 4 изображения
                </p>
            </div>
            <div className={classes.card} datatype="1q1img"
                onClick={(e) => {
                    setModal(true);
                    setquizType("1q1img");
                }}>
                <h3>На вопрос 1 изображение</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 изображений. либо на каждый вопрос добавляется единственное изображения, а 3
                    других изображения будут выбранны случайно (для данной викторины необходимо минимум 4 вопроса)
                </p>
            </div>
            <div className={classes.card}
                datatype="1q4textanswer"
                onClick={(e) => {
                    setModal(true);
                    setquizType("1q4textanswer");
                }}>
                <h3>На вопрос 4 текстовых ответа</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 текстовых блоков. На вопрос необходимо ввести 4 ответа.
                </p>
            </div>
            <div className={classes.card}
                datatype="1q1textanswer"
                onClick={(e) => {
                    setModal(true);
                    setquizType("1q1textanswer");
                }}>
                <h3>На вопрос 1 текстовый ответ</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 текстовых блоков. На вопрос предоставляется один ответ, оставшиеся 3 варианта
                    добавляются автоматически. (Для данной викторины необходимо минимум 4 вопроса).
                </p>
            </div>
        </div>
    );
}

export default CreateQuizPage;
