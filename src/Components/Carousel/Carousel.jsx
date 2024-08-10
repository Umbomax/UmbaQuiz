import React from 'react';
import classes from './Carousel.module.css';

function Carousel({ items, currentSlide, setCurrentSlide, checkValidForm, isQuizGame, answersStatus, setTransitioning }) {
    function setCarouselActive() {
        const STEP_LENGTH = window.innerWidth < 768 ? 40 : 55;
        let startPos = -STEP_LENGTH * Math.floor(items.length / 2);

        if (items.length % 2 === 0) {
            startPos = -STEP_LENGTH * Math.floor(items.length / 2) + (STEP_LENGTH / 2);
        } else {
            startPos = -STEP_LENGTH * Math.floor(items.length / 2);
        }
        return startPos + STEP_LENGTH * currentSlide; 
    }

    const activeCarouselBlock = {
        transform: `translateX(${setCarouselActive()}px)`,
    };

    return (
        <div className={classes.carousel}>
            {items.map((el, idx) => (
                <div
                    key={idx}
                    className={`${classes.carouselItem} ${
                        isQuizGame ? 
                        (answersStatus[idx]?.isCorrect ? classes.green : answersStatus[idx]?.isCorrect === false ? classes.red : '') :
                        (checkValidForm(idx) ? classes.green : classes.red)
                    }`}
                    onClick={() => {
                        setTransitioning(true);
                        setCurrentSlide(idx);
                    }}
                >
                    {idx + 1}
                </div>
            ))}
            <div style={activeCarouselBlock} className={classes.activeCarousel}></div>
        </div>
    );
}

export default Carousel;
