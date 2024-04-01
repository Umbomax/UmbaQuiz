import React from "react";
import classes from "./ModalCreateQuiz.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyImageInput from "../UI/MyImageInput/MyImageInput";

function MyModal({ visible, setVisible, quizType }) {
    const navigate = useNavigate();
    const rootClases = [classes.myModal];
    // const [quizSettings, setQuizSettings] = useState({ quizName: "", quizesCount: "", type: quizType, quizHeadImage: "",});
    const formData = new FormData();
    formData.set("quizType", quizType);

    if (visible) {
        rootClases.push(classes.active);
    }

    // setQuizSettings({ ...quizSettings, quizesCount: e.target.value })  На память мб пригодится

    return (
        <div className={rootClases.join(" ")} onClick={() => setVisible(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                <div className={classes.textInpustWrapper}>
                    <div className={classes.quizNameWrapper}>
                        <div>Введите название викторины</div>
                        <input className={classes.quizSelectInput} type="text" onChange={(e) => formData.set("quizName", e.target.value)} />
                    </div>

                    <div >
                        <div>Введите количество вопросов</div>
                        <input className={classes.quizSelectInput} type="number" onChange={(e) => formData.set("quizQuestionsNumbers", e.target.value)} />
                    </div>
                </div>

                <div className={classes.headImage}>
                    <div>Выберите изображение для отобрадения в списке викторин</div>
                    <MyImageInput className={classes.imageWrapper} formData={formData}></MyImageInput>
                </div>

                <button
                    className={classes.submitBtn}
                    onClick={(e) => {
                        e.preventDefault();

                        const formDataObject = {};
                        formData.forEach((value, key) => {
                            formDataObject[key] = value;
                        });

                        navigate("/newQuizDataset", { state: formDataObject });
                    }}
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
}

export default MyModal;
