import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import classes from "./QuizesHistory.module.css";

function QuizesHistory() {
    const [history, setHistory] = useState([]);
    const [filter, setFilter] = useState('all');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = jwtDecode(token);
                const userId = decoded.id;

                try {
                    const response = await axios.get(`${apiUrl}/quizHistory/${userId}`, {
                        params: { filter }
                    });
                    setHistory(response.data.history);
                } catch (error) {
                    console.error('Error fetching quiz history:', error);
                }
            }
        };

        fetchHistory();
    }, [filter]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className={classes.quizesHistoryContainer}>
            <div className={classes.filterContainer}>
                <label htmlFor="filter">Фильтр:</label>
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="all">За все время</option>
                    <option value="day">За день</option>
                    <option value="week">За неделю</option>
                    <option value="month">За месяц</option>
                </select>
            </div>
            <div className={classes.quizesHistory}>
                {history.map((attempt, index) => (
                    <div key={index} className={classes.quizCard}>
                        <img src={attempt.quizHeadImage || ''} alt={attempt.quizName} className={classes.quizImage} />
                        <div className={classes.quizDetails}>
                            <h3 className={classes.quizTitle}>{attempt.quizName}</h3>
                            <div className={classes.attemptDetails}>
                                <p>Дата начала: {new Date(attempt.dateStart).toLocaleString()}</p>
                                <p>Дата окончания: {new Date(attempt.dateEnd).toLocaleString()}</p>
                                <p>Результат: {attempt.result}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuizesHistory;
