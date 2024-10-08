import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ModalStartQuiz from "../../Components/ModalStartQuiz/ModalStartQuiz";
import ImageContainer from "../../Components/ImageContainer/ImageContainer";
import SearchQuizInput from "./SearchQuizInput/SearchQuizInput";
import classes from "./Quizes.module.css";
import { AuthContext } from "../../context/AuthContext";
import { FaPlay } from "react-icons/fa";

function Quizes() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);
    const [quizes, setQuizes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredQuizes, setFilteredQuizes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        checkUserAuthentication();
        fetchQuizes();
    }, [isLoggedIn]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const quizId = queryParams.get("quizId");
        if (quizId && quizes) {
            const quiz = quizes.find((quiz) => quiz._id === quizId);
            if (quiz) {
                setSelectedQuiz(quiz);
                setIsModalOpen(true);
            }
        }
    }, [location, quizes]);

    const checkUserAuthentication = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
        }
    };

    const fetchQuizes = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(`${apiUrl}/getQuizes`, { headers });
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
            const filtered = quizes.filter((quiz) => quiz.quizName.toLowerCase().includes(term.toLowerCase()));
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
            const response = await axios.get(`${apiUrl}/getQuiz/${selectedQuiz._id}`);
            navigate("/quizGame", { state: response.data.quiz });
        } catch (error) {
            console.error("Error starting quiz:", error);
        }
    };

    return (
        <div className={classes.root}>
            <SearchQuizInput value={searchTerm} onChange={handleSearch} />
            <section className={classes.cardsContainer}>
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, idx) => <div key={idx} className={`${classes.quizCard} ${classes.skeletonCard}`}></div>)
                ) : filteredQuizes.length > 0 ? (
                    filteredQuizes.map((quiz, idx) => (
                        <div key={idx} className={classes.quizCard} onClick={() => openQuizModal(quiz)}>
                            <h2>{quiz.quizName}</h2>
                            <div className={classes.imageWrapper}>
                            <ImageContainer src={quiz.quizHeadImage} altName={quiz.quizName}></ImageContainer>
                            </div>
                            
                            {/* <div className={classes.imageContainer}>
                                <div className={classes.blurredBackground} style={{ backgroundImage: `url(${quiz.quizHeadImage})` }}></div>
                                <img src={quiz.quizHeadImage} className={classes.quizHeadImg} alt={quiz.quizName} />
                            </div> */}
                            <div className={classes.countContainer}>
                                <div>
                                    <FaPlay /> <span>{quiz.countOfStarts}</span>
                                </div>
                                <span>Ваши попытки: {quiz.userAttemptsCount || 0}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={classes.notFound}>No quizzes found.</div>
                )}
            </section>
            {isModalOpen && (
                <ModalStartQuiz onClose={closeQuizModal}>
                    <h2 className={classes.headName}>{selectedQuiz.quizName}</h2>    
                    <p>{selectedQuiz.quizDescription}</p>
                    <ImageContainer src={selectedQuiz.quizHeadImage} altName={selectedQuiz.quizName}></ImageContainer>
                    <button className={classes.startQuiz} onClick={handleStartQuiz}>Начать</button>
                </ModalStartQuiz>
            )}
        </div>
    );
}

export default Quizes;
