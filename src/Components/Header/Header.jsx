import React, { useState } from "react";
import Logo from "./Logo/Logo";
import LogIn from "./LogIn/LogIn";
import NavPanel from "./NavPanel/NavPanel";
import Auth from "./Auth/Auth";
import classNames from "./Header.module.css";

function Header({ createError }) {
    const [modal, setModal] = useState(false);
    const [popUp, setPopup] = useState(false);

    const chooseRoute = () => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log("Token found, setting popup to true");
            setPopup(true);
        } else {
            console.log("No token, setting modal to true");
            setModal(true);
        }
    };

    const logIn = (e) => {
        e.stopPropagation();
        chooseRoute();
    };

    return (
        <header className={classNames.header}>
            <Logo />
            <NavPanel />
            <LogIn logIn={logIn} popUp={popUp} setPopup={setPopup} />
            <Auth visible={modal} setVisible={setModal} createError={createError} />
        </header>
    );
}

export default Header;
