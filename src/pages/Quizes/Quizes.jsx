import React, { useState, useEffect } from "react";
import SearchQuizInput from "./SearchQuizInput/SearchQuizInput";
import clases from "./Quizes.module.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Quizes() {
    const navigate = useNavigate();
    const [quizes, setQuizes] = useState([]);

    useEffect(() => {
        async function fetchQuizes() {
            try {
                const response = await axios.get('http://localhost:3030/api/getQuizes');
                setQuizes(response.data); // Предполагается, что сервер возвращает массив объектов
            } catch (error) {
                console.error('Error fetching quizes:', error);
            }
        }

        fetchQuizes();
    }, []);
    return <div className={clases.root}>
        <SearchQuizInput></SearchQuizInput>
        <section className={clases.cardsContainer}>
                {quizes.map(quiz => (
                    <div key={quiz.id} className={clases.quizCard}>
                        {/* Здесь вы можете отобразить информацию о каждом викторине */}
                        <h2>{quiz.quizName}</h2>                        
                        <img src={quiz.quizHeadImage} className={clases.quizHeadImg} alt="slt" />
                    </div>
                ))}
            {/* TODO if admin show create quiz box */}
            <div className={clases.createQuiz} onClick={(e)=> navigate("/createQuiz")}>
                
            </div>              
            
        </section>
    </div>;
}

export default Quizes;
