import React from "react";
import classes from "./ModalCreateQuiz.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyModal({ visible, setVisible, quizType }) {
    console.log(quizType);
    const navigate = useNavigate();
    const rootClases = [classes.myModal];
    const [formData, setFormData] = useState({ quizName: "", quizesCount: "", type: quizType });
    console.log(formData);
    if (visible) {
        rootClases.push(classes.active);
    }
    const newQuizForm = new FormData();

    return (
        <div className={rootClases.join(" ")} onClick={() => setVisible(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                <input type="text" placeholder="Введите название викторины" onChange={(e) => setFormData({ ...formData, quizName: e.target.value })} />
                <input type="number" placeholder="Введите количество вопросово" onChange={(e) => setFormData({ ...formData, quizesCount: e.target.value })} />
                <button
                    className={classes.submitBtn}
                    onClick={(e) => {
                        e.preventDefault();

                        navigate("/newQuizDataset", { state: formData });
                    }}
                />
            </div>
        </div>
    );
}

export default MyModal;
