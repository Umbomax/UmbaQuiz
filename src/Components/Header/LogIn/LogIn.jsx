import React from 'react';
import UserIcon from '../../../assets/images/UserIcon.png';
import UserSettingsPopup from './UserSettingsPopup/UserSettingsPopup';
import classes from './LogIn.module.css';

function LogIn({ isLoggedIn, username, popUp, setPopup, logIn, logOut }) {
    return (
        <div className={classes.logInContainer}>
            {isLoggedIn ? (
                <div className={classes.userSection} onClick={(e) => {
                    e.stopPropagation();
                    setPopup(!popUp);
                }}>
                    {/* <img className={classes.img} src={UserIcon} alt="UserIcon" /> */}
                    <svg className={classes.img} width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.812309 16.9096C0.157054 13.3509 2.69374 11.2999 4.18616 10.3658C1.21605 7.37745 2.57411 3.38178 4.18616 2.04634C6.06189 0.492482 9.41939 -0.213378 11.6116 2.45603C14.3186 5.75235 12.74 9.04781 11.6116 10.3658C12.3396 11.0067 14.8423 12.6727 15.2093 16.097C15.6724 20.4175 1.63138 21.3581 0.812309 16.9096Z" fill="#FCC822"/>
</svg>
                    <span className={classes.username}>{username}</span>
                    <span className={classes.arrowDown}>▼</span>
                    {popUp && <UserSettingsPopup popUp={popUp} setPopup={setPopup} logOut={logOut} />}
                </div>
            ) : (
                <button className={classes.loginButton} onClick={logIn}>Войти</button>
            )}
        </div>
    );
}

export default LogIn;
