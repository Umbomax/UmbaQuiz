import React from "react";
import classes from "./BurgerMenu.module.css";

function BurgerMenu({ onClick, isNavOpen }) {
    return (
        <div className={`${classes.burgerMenu} ${isNavOpen ? classes.notVisible : ""}`} onClick={onClick}>
            <div className={classes.burgerLine}></div>
            <div className={classes.burgerLine}></div>
            <div className={classes.burgerLine}></div>
        </div>
    );
}

export default BurgerMenu;
