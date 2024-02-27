import Header from "./Components/Header/Header";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Quizes from "./pages/Quizes/Quizes";

import UserSettings from "./pages/UserSettings/UserSettings";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header></Header>
            </div>
            <Routes>
                <Route path="/userSettings" element={<UserSettings></UserSettings>}></Route>
                <Route path="" element={<Quizes></Quizes>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
