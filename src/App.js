import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header";
import Quizes from "./pages/Quizes/Quizes";
import CreateQuizPage from "./pages/CreateQuizPage/CreateQuizPage";
import { AuthProvider, AuthContext } from './context/AuthContext.jsx';
import QuizGame from "./pages/QuizGame/QuizGame.jsx";
import About from "./pages/About/About.jsx";
import NewQuizDataset from "./pages/NewQuizDataset/NewQuizDataset";
import StatusBox from "./Components/StatusBox/StatusBox";
import UserSettings from "./pages/UserSettings/UserSettings";
import Footer from "./Components/Footer/Footer.jsx";
import Support from "./pages/Support/Support.jsx";

function App() {
    const [errors, setErrors] = useState([]);

    const createError = (newError) => {
        console.log(newError);
        setErrors([...errors, newError]);
    };

    const removeError = (error) => {
        setErrors(errors.filter((el) => el.id !== error.id));
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="App">
                    <Header createError={createError} />
                </div>
                <div className="mainContentBackground">
                    <Routes>
                        <Route path="/" element={<Quizes createError={createError} />} />
                        <Route path="/quizGame" element={<QuizGame createError={createError} />} />
                        <Route path="/about" element={<PrivateRoute><About createError={createError} /></PrivateRoute>} />
                        <Route path="/createQuiz" element={<CreateQuizPage createError={createError} />} />
                        <Route path="/newQuizDataset" element={<AdminRoute><NewQuizDataset createError={createError} /></AdminRoute>} />
                        <Route path="/support" element={<PrivateRoute><Support createError={createError} /></PrivateRoute>} />
                        <Route path="/userSettings" element={<PrivateRoute><UserSettings createError={createError} /></PrivateRoute>} />
                    </Routes>
                </div>
                <Footer />
                <StatusBox errors={errors} removeError={removeError} />
            </BrowserRouter>
        </AuthProvider>
    );
}

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? children : <Navigate to="/" />;
};

const AdminRoute = ({ children }) => {
    const { isLoggedIn, userRole } = useContext(AuthContext);
    return (isLoggedIn && (userRole === 'ADMIN' || userRole === 'SUPERADMIN')) ? children : <Navigate to="/" />;
};

export default App;
