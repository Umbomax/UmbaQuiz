import React from 'react';
import classes from "./StatusContent.module.css";

function StatusContent({ error, removeError }) {
  

    return (
        <div className={`${classes.container} ${error.status === "ok" ? classes.ok : ""}`}>
            <button
                className={classes.btn}
                onClick={(e) => {
                    e.preventDefault();
                    removeError(error);
                }}
            >
                X
            </button>
            <div className={classes.errorText}>{error.errorText}</div>
        </div>
    );
}

export default StatusContent;
