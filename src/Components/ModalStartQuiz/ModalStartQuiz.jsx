import React from "react";

import classes from "./ModalStartQuiz.module.css";

const ModalStartQuiz = ({ children, onClose }) => {
    return (
        <div className={classes.modalBackdrop} onClick={onClose}>
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={classes.closeButton} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default ModalStartQuiz;
