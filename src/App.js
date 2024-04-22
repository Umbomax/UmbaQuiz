import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quizes from "./pages/Quizes/Quizes";
import CreateQuizPage from "./pages/CreateQuizPage/CreateQuizPage";

import QuizGame from "./pages/QuizGame/QuizGame.jsx";

import NewQuizDataset from "./pages/NewQuizDataset/NewQuizDataset";
import ErrorsBox from "./Components/ErrorsBox/StatusBox";

import UserSettings from "./pages/UserSettings/UserSettings";

function App() {
    const [errors, setErrors] = useState([]);

    const createError = (newError) => {
        setErrors([...errors, newError]);
    };

    const removeError = (error) => {
        setErrors(errors.filter((el) => el.id !== error.id));
    };

    return (
        <BrowserRouter>
            <ErrorsBox errors={errors} removeError={removeError}></ErrorsBox>
            <div className="App">
                <Header createError={createError}></Header>
            </div>
            <Routes>
                <Route path="/userSettings" element={<UserSettings></UserSettings>}></Route>
                <Route path="/" element={<Quizes></Quizes>}></Route>
                <Route path="/createQuiz" element={<CreateQuizPage></CreateQuizPage>}></Route>
                <Route path="/newQuizDataset" element={<NewQuizDataset></NewQuizDataset>}></Route>
                <Route path="/quizGame" element={<QuizGame></QuizGame>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
