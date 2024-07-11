import React from "react";
import classes from "./NavPanel.module.css";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function NavPanel({ isOpen, toggleNav, closeNav }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userRole = null;

    if (token) {
        const decoded = jwtDecode(token);
        userRole = decoded.roles[0];
        console.log(userRole);
    }

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
                {userRole && (
                    <div className={classes.navItem} onClick={() => handleNavigate("/support")}>Поддержка</div>
                )}
                {(userRole === "ADMIN" || userRole === "SUPERADMIN") && (
                    <div className={classes.navItem} onClick={() => handleNavigate("/createQuiz")}>Создать викторину</div>
                )}
            </nav>
        </>
    );
}

export default NavPanel;
