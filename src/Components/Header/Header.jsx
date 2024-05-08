import React from "react";
import Logo from "./Logo/Logo";
import LogIn from "./LogIn/LogIn";
import classNames from "./Header.module.css";
import Auth from "./Auth/Auth";
import { useEffect, useState } from "react";
import NavPanel from "./NavPanel/NavPanel"


function Header({createError}) {
    
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

    
    
    const logIn = (e)=> {
        e.stopPropagation();
        chooseRoute();
    }

    return (
        <header>
            <Logo></Logo>
            <NavPanel></NavPanel>
            <LogIn
                logIn={logIn}
                popUp={popUp} 
                setPopup={setPopup}
            ></LogIn>
            
            <Auth visible={modal} setVisible={setModal} createError={createError}></Auth>
        </header>
    );
}

export default Header;
