import React from "react";
import classes from "./NavPanel.module.css";
import { useNavigate } from "react-router-dom";

function NavPanel({ isOpen, toggleNav, closeNav }) {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        toggleNav();
    };

    return (
        <>
            {isOpen && window.innerWidth < 768 && <div className={classes.overlay} onClick={closeNav}></div>}
            <nav className={`${classes.navContainer} ${isOpen ? classes.active : ""}`}>
                <div className={classes.navItem} onClick={() => handleNavigate("/")}>Главная</div>
                <div className={classes.navItem} onClick={() => handleNavigate("/about")}>О проекте</div>
                <div className={classes.navItem} onClick={() => handleNavigate("/support")}>Поддержка</div>
            </nav>
        </>
    );
}

export default NavPanel;
