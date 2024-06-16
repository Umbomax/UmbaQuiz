import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";  // Импортируем jwtDecode
import ModalStartQuiz from "../../Components/ModalStartQuiz/ModalStartQuiz";
import SearchQuizInput from "./SearchQuizInput/SearchQuizInput";
import classes from "./Quizes.module.css";

function Quizes() {
    const navigate = useNavigate();
    const location = useLocation();
    const [quizes, setQuizes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredQuizes, setFilteredQuizes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        checkUserAuthentication();
        fetchQuizes();
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const quizId = queryParams.get('quizId');
        if (quizId) {
            const quiz = quizes.find(q => q._id === quizId);
            if (quiz) {
                setSelectedQuiz(quiz);
                setIsModalOpen(true);
            }
        }
    }, [location, quizes]);

    const checkUserAuthentication = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
        }
    };

    const fetchQuizes = async () => {
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get("https://umbaquizserver-production.up.railway.app/api/getQuizes", { headers });
            setQuizes(response.data);
            setFilteredQuizes(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching quizes:", error);
            setIsLoading(false);
        }
    };

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

    const openQuizModal = (quiz) => {
        setSelectedQuiz(quiz);
        setIsModalOpen(true);
        navigate(`?quizId=${quiz._id}`);
    };

    const closeQuizModal = () => {
        setIsModalOpen(false);
        setSelectedQuiz(null);
        navigate(location.pathname);
    };

    const handleStartQuiz = async () => {
        try {
            const response = await axios.get(`https://umbaquizserver-production.up.railway.app/api/getQuiz/${selectedQuiz._id}`);
            navigate("/quizGame", { state: response.data.quiz });
        } catch (error) {
            console.error("Error starting quiz:", error);
        }
    };

    return (
        <div className="mainContentBackground">
            <div className={classes.root}>
                <SearchQuizInput value={searchTerm} onChange={handleSearch} />
                <section className={classes.cardsContainer}>
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className={`${classes.quizCard} ${classes.skeletonCard}`}></div>
                        ))
                    ) : (
                        filteredQuizes.length > 0 ? (
                            filteredQuizes.map((quiz, idx) => (
                                <div
                                    key={idx}
                                    className={classes.quizCard}
                                    onClick={() => openQuizModal(quiz)}
                                >
                                    <h2>{quiz.quizName}</h2>
                                    <img src={quiz.quizHeadImage} className={classes.quizHeadImg} alt={quiz.quizName} />
                                </div>
                            ))
                        ) : (
                            <div className={classes.notFound}>No quizzes found.</div>
                        )
                    )}
                   
                </section>
                {isModalOpen && (
                    <ModalStartQuiz onClose={closeQuizModal}>
                        <h2>{selectedQuiz.quizName}</h2>
                        <p>{selectedQuiz.quizDescription}</p>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <img className={classes.quizHeadImg} src={selectedQuiz.quizHeadImage}></img>
                        <button onClick={handleStartQuiz}>Начать</button>
                    </ModalStartQuiz>
                )}
            </div>
        </div>
    );
}

export default Quizes;
