import React from "react";
import clases from "./UserSettingsPopup.module.css";
import MyButton from "../../UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";

function UserSettingsPopup({ popUp, setPopup }) {
    const navigate = useNavigate();

    console.log("We are in Popup");

    const logOut = () => {
        localStorage.clear();
        navigate("");
        setPopup(false);
    };

    const rootClases = [clases.popup];
    if (popUp) {
        rootClases.push(clases.active);
    }

    return popUp ? (
        <div
            className={rootClases.join(" ")}
            onClick={() => {
              
                navigate("");
                setPopup(prevPopup => !prevPopup); // Обновляем состояние синхронно
                
            }}
        >
            <div className={clases.popupContent} onClick={(e) => e.stopPropagation()}>
                <MyButton
                    onClick={() => {
                        navigate("/userSettings");
                        setPopup(false);
                    }}
                >
                    Профиль
                </MyButton>
                <MyButton onClick={logOut}>Выйти</MyButton>
            </div>
        </div>
    ) : null;
}

export default UserSettingsPopup;
