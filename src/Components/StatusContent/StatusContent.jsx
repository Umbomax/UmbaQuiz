import React from 'react';
import classes from "./StatusContent.module.css";

function StatusContent({ error, removeError }) {
    console.log(`Rendering StatusContent for error ID: ${error.id}`);

    return (
        <div className={classes.container}>
            <button
                className={classes.btn}
                onClick={(e) => {
                    e.preventDefault();
                    console.log(`Manually removing error ID: ${error.id}`);
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
