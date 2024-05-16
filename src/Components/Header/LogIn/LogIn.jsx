import React from "react";
import UserIcon from "../../../assets/images/UserIcon.png";
import UserSettingsPopup from "./UserSettingsPopup/UserSettingsPopup";
import classes from "./LogIn.module.css";

function LogIn({ popUp, setPopup, logIn }) {
    return (
        <div className={classes.logInContainer} onClick={logIn}>
            <img className={classes.img} src={UserIcon} alt="UserIcon" />
            {popUp && <UserSettingsPopup popUp={popUp} setPopup={setPopup} />}
        </div>
    );
}

export default LogIn;
