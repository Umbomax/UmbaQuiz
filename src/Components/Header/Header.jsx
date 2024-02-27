import React from "react";
import Logo from "./Logo/Logo";
import LogIn from "./LogIn/LogIn";
import classNames from "./Header.module.css";
import Auth from "./Auth/Auth";
import { useEffect, useState } from "react";

import UserSettingsPopup from "./UserSettingsPopup/UserSettingsPopup";

function Header() {
    const [modal, setModal] = useState(false);
    const [popUp, setPopup] = useState(false);
    
    const chooseRoute = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setPopup(true);
        } else {
            setModal(true);
        }
    };

    return (
        <header>
            
            <Logo></Logo>
            <LogIn
                onClick={(e) => {                    
                    e.stopPropagation();
                    chooseRoute();
                }}
            >
               
            </LogIn>
            <UserSettingsPopup popUp={popUp} setPopup={setPopup}></UserSettingsPopup>
            <Auth visible={modal} setVisible={setModal}></Auth>
        </header>
    );
}

export default Header;
