import React, { useState } from "react";
import classes from "./NewQuizDataset.module.css";
import { useLocation } from "react-router-dom";
import MyImageInput from "../../Components/UI/MyImageInput/MyImageInput";

function NewQuizDataset() {
    const [formData, setFormData] = useState(new FormData());
    const location = useLocation();
    const { state } = location;
    const quizNums = state.quizesCount;
    const [currentSlide, setCurrentSlide] = useState(0);
    const arr = Array(+state.quizesCount).fill(null);

    const inlineStyle = {
        width: `${100 * quizNums}%`,
    };
    const activeSlide = {
        transform: `translateX(${-100 * currentSlide}%)`,
    };

    const handleFileChange = (file, num, type) => {
        formData.append(`${num}.${type}`, file);
    };

    return (
        <div>
            <div className={classes.carouser}>
                {arr.map((el, idx) => (
                    <div
                        key={idx}
                        className={classes.carouserItem}
                        onClick={(e) => setCurrentSlide(+idx)}
                    >
                        {idx + 1}
                    </div>
                ))}
            </div>

            <div className={classes.quizFormsWrapper}>
                <div
                    style={inlineStyle}
                    className={classes.quizFormsContainer}
                >
                    {arr.map((el, idx) => (
                        <form
                            style={activeSlide}
                            key={idx}
                            className={classes.quizForm}
                        >
                            <h2>{`Форма номер ${idx + 1}`}</h2>
                            <input
                                type="text"
                                placeholder="Введите вопрос"
                            />
                            <div className={classes.correctAnswer}>
                                <MyImageInput
                                    className={classes.fileInput}
                                    type="file"
                                    placeholder="Правильный ответ"
                                    formData={formData}
                                    options={{ num: idx, type: "correct" }}
                                    onFileChange={handleFileChange}
                                />
                            </div>
                            <div className={classes.incorrectAnswers}>
                                <MyImageInput
                                    type="file"
                                    placeholder="НеПравильный ответ"
                                    formData={formData}
                                    options={{ num: idx, type: "incorrect" }}
                                    onFileChange={handleFileChange}
                                />
                                <MyImageInput
                                    type="file"
                                    placeholder="НеПравильный ответ"
                                    formData={formData}
                                    options={{ num: idx, type: "incorrect" }}
                                    onFileChange={handleFileChange}
                                />
                                <MyImageInput
                                    type="file"
                                    placeholder="НеПравильный ответ"
                                    formData={formData}
                                    options={{ num: idx, type: "incorrect" }}
                                    onFileChange={handleFileChange}
                                />
                            </div>
                        </form>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewQuizDataset;