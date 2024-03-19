import React from "react";
import classes from "./CreateQuizPage.module.css";

function CreateQuizPage() {
    return (
        <div className={classes.chooseType}>
            <div className={classes.card}>
                <h3>1 вопрос 4 изображения</h3>
                <p className={classes.description}>
                    В данной викторине создается викторина, в которой на вопрос предоставляются варианты ответа в виде 4 изображений. Имеется 2 вида создания викторины: на каждый вопрос выбираются 4
                    изображения либо на каждый вопрос добавляется единственное изображения, а 3 других изображения будут выбранны случайно (для данной викторины необходимо минимум 4 вопроса)
                </p>
            </div>
        </div>
    );
}

export default CreateQuizPage;
