import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quizes from "./pages/Quizes/Quizes";
import ErrorsBox from "./Components/ErrorsBox/ErrorBox";

import UserSettings from "./pages/UserSettings/UserSettings";

function App() {

    const [errors, setErrors] = useState([])

    const createError = (newError) => {
        
        setErrors([...errors, newError]);
       
    };

    const removeError = (error) => {
        setErrors(errors.filter((el) => el.id !== error.id)); 
    };

    return (
        <BrowserRouter>
            <ErrorsBox errors = {errors} removeError={removeError}>
               
            </ErrorsBox>
            <div className="App">
                <Header createError={createError}></Header>
            </div>
            <Routes>
                <Route path="/userSettings" element={<UserSettings></UserSettings>}></Route>
                <Route path="" element={<Quizes></Quizes>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
