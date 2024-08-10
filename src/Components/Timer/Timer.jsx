import React, { useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import classes from './Timer.module.css';

function Timer({ quizTime, onTimeEnd }) {
    const [timeLeft, setTimeLeft] = useState(quizTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeEnd();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onTimeEnd]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className={classes.timer}>
            <FaClock className={classes.icon} />
            <span>{formatTime(timeLeft)}</span>
        </div>
    );
}

export default Timer;
