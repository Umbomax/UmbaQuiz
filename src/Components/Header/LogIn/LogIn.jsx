import React from "react";
import classes from "./LogIn.module.css";
import UserIcon from "../../../assets/images/UserIcon.png";
import UserSettingsPopup from "./UserSettingsPopup/UserSettingsPopup";
import { useEffect, useState } from "react";

function LogIn({ popUp, setPopup, logIn }) {
    return (
        <div onClick={logIn} className={classes.logInContainer}>
            <img className={classes.img} src={UserIcon} alt="UserIcon" />
            <UserSettingsPopup popUp={popUp} setPopup={setPopup} />
        </div>
    );
}

export default LogIn;
