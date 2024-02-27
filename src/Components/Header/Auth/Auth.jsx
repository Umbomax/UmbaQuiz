import React from "react";
import classes from "./Auth.module.css";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm/LoginForm"

function MyModal({ visible, setVisible }) {
    const rootClases = [classes.myModal];

    const [selectedSlide, setSelectedSlide] = useState("login");

    const handleSlideChange = (event) => {
        setSelectedSlide(event.target.id);
    };



    if (visible) {
        rootClases.push(classes.active);
    }

    return (
        <div className={rootClases.join(" ")} onClick={() => setVisible(false)}>
            <div className={classes.myModalContent} onClick={(e) => e.stopPropagation()}>
                <div style={{ marginLeft: selectedSlide === "signup" ? "-100%" : "0" }} className={classes.titleText}>
                    <div className={`${classes.title} ${classes.login}`}>Login Form</div>
                    <div className={`${classes.title} ${classes.signup}`}>Signup Form</div>
                </div>
                <div className={classes.slideControls}>
                    <input type="radio" name="slide" id="login" defaultChecked={selectedSlide === "login"} onChange={handleSlideChange} />
                    <input type="radio" name="slide" id="signup" defaultChecked={selectedSlide === "signup"} onChange={handleSlideChange} />
                    <label htmlFor="login" className={`${classes.slide} ${classes.login} ${selectedSlide === "login" ? classes.textColorWhite : classes.textColorBlack}`}>
                        Login
                    </label>
                    <label htmlFor="signup" className={`${classes.slide} ${classes.signup} ${selectedSlide === "signup" ? classes.textColorWhite : classes.textColorBlack}`}>
                        Signup
                    </label>
                    <div className={`${classes.sliderTab} ${selectedSlide === "signup" ? classes.sliderTabChecked : " "}`}></div>
                </div>
                <div className={classes.formsWrapper}>
                    <div style={{ marginLeft: selectedSlide === "signup" ? "-100%" : "0" }} className={`${classes.formsContainer}`}>
                        <LoginForm ></LoginForm>
                        <form className={`${classes.form}`} action="" method="post">
                            <div className={classes.inputContainer}>
                                <input className={classes.formInput} type="text" placeholder="Login" />
                            </div>
                            <div className={classes.inputContainer}>
                                <input className={classes.formInput} type="text" placeholder="Password" />
                            </div>
                            <div className={classes.inputContainer}>
                                <input className={classes.formInput} type="text" placeholder="Repit password" />
                            </div>
                            <div className={classes.inputContainer}>
                                <input className={classes.formInput} type="text" placeholder="Email" />
                            </div>
                            <button className={classes.formBtn} type="button">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyModal;
