import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quizes from "./pages/Quizes/Quizes";
import CreateQuizPage from "./pages/CreateQuizPage/CreateQuizPage";
import { AuthProvider } from './context/AuthContext.jsx';
import QuizGame from "./pages/QuizGame/QuizGame.jsx";
import About from "./pages/About/About.jsx";

import NewQuizDataset from "./pages/NewQuizDataset/NewQuizDataset";
import StatusBox from "./Components/StatusBox/StatusBox";

import UserSettings from "./pages/UserSettings/UserSettings";
import Footer from "./Components/Footer/Footer.jsx";

function App() {
    const [errors, setErrors] = useState([]);

    const createError = (newError) => {
        console.log(newError)
        setErrors([...errors, ...newError]);
    };

    const removeError = (error) => {
        setErrors(errors.filter((el) => el.id !== error.id));
    };

    return (
        <BrowserRouter>
        <AuthProvider>
            
            <div className="App">
                <Header createError={createError}></Header>
            </div>
           <div className="mainContentBackground">
           <Routes>
                <Route path="/userSettings" element={<UserSettings createError={createError}></UserSettings>}></Route>
                <Route path="/" element={<Quizes createError={createError}></Quizes>}></Route>
                <Route path="/about" element={<About createError={createError}></About>}></Route>
                <Route path="/createQuiz" element={<CreateQuizPage createError={createError}></CreateQuizPage>}></Route>
                <Route path="/newQuizDataset" element={<NewQuizDataset createError={createError}></NewQuizDataset>}></Route>
                <Route path="/quizGame" element={<QuizGame createError={createError}></QuizGame>}></Route>
            </Routes>
           </div>
            
            <Footer></Footer>
            <StatusBox errors={errors} removeError={removeError}></StatusBox>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
