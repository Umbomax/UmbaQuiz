import React, { useState, useEffect } from "react";
import SearchQuizInput from "./SearchQuizInput/SearchQuizInput";
import clases from "./Quizes.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Quizes() {
    const navigate = useNavigate();
    const [quizes, setQuizes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredQuizes, setFilteredQuizes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchQuizes() {
            try {
                const response = await axios.get("https://umbaquizserver-production.up.railway.app/api/getQuizes");
                setQuizes(response.data);
                setFilteredQuizes(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching quizes:", error);
                setIsLoading(false);
            }
        }

        fetchQuizes();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term) {
            const filtered = quizes.filter(quiz =>
                quiz.quizName.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredQuizes(filtered);
        } else {
            setFilteredQuizes(quizes);
        }
    };

    return (
        <div className="mainContentBackground">
            <div className={clases.root}>
                <SearchQuizInput value={searchTerm} onChange={handleSearch} />
                <section className={clases.cardsContainer}>
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className={`${clases.quizCard} ${clases.skeletonCard}`}></div>
                        ))
                    ) : (
                        filteredQuizes.length > 0 ? (
                            filteredQuizes.map((quiz, idx) => (
                                <div
                                    key={idx}
                                    className={clases.quizCard}
                                    onClick={() => navigate("/quizGame", { state: quiz })}
                                >
                                    <h2>{quiz.quizName}</h2>
                                    <img src={quiz.quizHeadImage} className={clases.quizHeadImg} alt={quiz.quizName} />
                                </div>
                            ))
                        ) : (
                            <div className={clases.notFound}>No quizzes found.</div>
                        )
                    )}
                    <div className={clases.createQuiz} onClick={() => navigate("/createQuiz")}></div>
                </section>
            </div>
        </div>
    );
}

export default Quizes;
