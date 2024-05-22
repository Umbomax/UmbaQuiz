import React, { useState } from "react";
import Logo from "./Logo/Logo";
import LogIn from "./LogIn/LogIn";
import NavPanel from "./NavPanel/NavPanel";
import Auth from "./Auth/Auth";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import classNames from "./Header.module.css";

function Header({ createError }) {
    const [modal, setModal] = useState(false);
    const [popUp, setPopup] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const chooseRoute = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setPopup(true);
        } else {
            setModal(true);
        }
    };

    const logIn = (e) => {
        e.stopPropagation();
        chooseRoute();
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <header className={classNames.header}>
            <Logo />
            <BurgerMenu onClick={toggleNav} />
            <NavPanel isOpen={isNavOpen} toggleNav={toggleNav} />
            <LogIn logIn={logIn} popUp={popUp} setPopup={setPopup} />
            <Auth visible={modal} setVisible={setModal} createError={createError} />
        </header>
    );
}

export default Header;
