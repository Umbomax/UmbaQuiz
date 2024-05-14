import React from "react";
import clases from "./UserSettingsPopup.module.css";
import MyButton from "../../../UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UserSettingsPopup({ popUp, setPopup }) {
    const navigate = useNavigate();

   

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
        <div className={clases.root}>
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
            <div
                className={rootClases.join(" ")}
                onClick={async (e) => {
                    e.stopPropagation();
  
                    
                    setPopup(false);
                }}
            ></div>
        </div>
    ) : null;
}

export default UserSettingsPopup;
