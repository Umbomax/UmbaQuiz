import React from "react";
import classes from "./ModalCreateQuiz.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyImageInput from "../UI/MyImageInput/MyImageInput";

function MyModal({ visible, setVisible, quizType, ...props }) {
    const navigate = useNavigate();
    

    const [quizSettings, setQuizSettings] = useState({ quizName: "", quizesCount: "", type: quizType, quizHeadImage: "",});
    useEffect(() => {
        
        setQuizSettings(prevSettings => ({
            ...prevSettings,
            type: quizType
        }));
    }, [quizType]);
    console.log(quizSettings)
    const rootClases = [classes.myModal];

    if (visible) {
        rootClases.push(classes.active);
    }

    function setHeadImage(base64string){
        setQuizSettings({ ...quizSettings, quizHeadImage: base64string })
    }

    return (
        <div className={rootClases.join(" ")} onClick={() => setVisible(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                <div className={classes.textInpustWrapper}>
                    <div className={classes.quizNameWrapper}>
                        <div>Введите название викторины</div>
                        <input className={classes.quizSelectInput} type="text" onChange={(e) => setQuizSettings({ ...quizSettings, quizName: e.target.value })} />
                    </div>

                    <div >
                        <div>Введите количество вопросов</div>
                        <input className={classes.quizSelectInput} type="number" onChange={(e) => setQuizSettings({ ...quizSettings, quizesCount: e.target.value })} />
                    </div>
                </div>

                <div className={classes.headImage}>
                    <div>Выберите изображение для отобрадения в списке викторин</div>
                    <MyImageInput className={classes.imageWrapper} setHeadImage={setHeadImage}></MyImageInput>
                </div>

                <button
                    className={classes.submitBtn}
                    onClick={(e) => {
                        e.preventDefault();                       

                        navigate("/newQuizDataset", { state: quizSettings });
                    }}
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
}

export default MyModal;
