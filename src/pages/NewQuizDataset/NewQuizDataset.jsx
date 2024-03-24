import React, { useState } from "react";
import classes from "./newQuizDataset.module.css";
import { useLocation } from "react-router-dom";

function NewQuizDataset() {
    const location = useLocation();
    const { state } = location;
    const [currentFormIndex, setCurrentFormIndex] = useState(0);
    const [formData, setFormData] = useState(Array(state.quizesCount).fill(null).map(() => ({ images: ["", "", "", ""] })));

    const handleImageChange = (formIndex, imageIndex, e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const newImages = [...formData[formIndex].images];
            newImages[imageIndex] = reader.result;
            const newFormData = [...formData];
            newFormData[formIndex] = { images: newImages };
            setFormData(newFormData);
        };
        reader.readAsDataURL(file);
    };

    const handlePrevForm = () => {
        setCurrentFormIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextForm = () => {
        setCurrentFormIndex((prevIndex) => Math.min(prevIndex + 1, state.quizesCount - 1));
    };

    const handleAccept = () => {
        console.log("Submitted Data:", formData);
        // Здесь можно отправить данные на сервер или выполнить другие действия
    };

    return (
        <div>
            <div className={classes.carousel}>
                {formData.map((form, formIndex) => (
                    <div key={formIndex} className={`${classes.carouselItem} ${formIndex === currentFormIndex ? classes.active : ""}`}>
                        <h2>Форма {formIndex + 1}</h2>
                        <div className={classes.images}>
                            {form.images.map((image, imageIndex) => (
                                <div key={imageIndex} className={classes.imageContainer}>
                                    {image ? (
                                        <img src={image} alt={`Изображение ${imageIndex + 1}`} className={classes.image} />
                                    ) : (
                                        <input type="file" onChange={(e) => handleImageChange(formIndex, imageIndex, e)} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.navigation}>
                <button onClick={handlePrevForm} disabled={currentFormIndex === 0}>
                    Назад
                </button>
                <button onClick={handleNextForm} disabled={currentFormIndex === state.quizesCount - 1}>
                    Вперед
                </button>
            </div>
            <button onClick={handleAccept}>Принять</button>
        </div>
    );
}

export default NewQuizDataset;