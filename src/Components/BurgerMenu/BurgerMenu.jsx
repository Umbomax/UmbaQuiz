import React from "react";
import classes from "./BurgerMenu.module.css";

function BurgerMenu({ onClick }) {
    return (
        <div className={classes.burgerMenu} onClick={onClick}>
            <div className={classes.burgerLine}></div>
            <div className={classes.burgerLine}></div>
            <div className={classes.burgerLine}></div>
        </div>
    );
}

export default BurgerMenu;
