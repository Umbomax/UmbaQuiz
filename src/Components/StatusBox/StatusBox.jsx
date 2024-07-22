import React, { useEffect, useRef } from "react";
import classes from "./StatusBox.module.css";
import StatusContent from "../StatusContent/StatusContent";

function StatusBox({ errors, removeError }) {
    const timers = useRef({});
        useEffect(() => {
            errors.forEach(error => {
                if (!timers.current[error.id]) {
                    timers.current[error.id] = setTimeout(() => {
                        console.log(`Removing error ID: ${error.id}`);
                        removeError(error);
                        delete timers.current[error.id];
                    }, 1500);
                    console.log(`Setting timer for error ID: ${error.id}`);
                }
            });

            return () => {
                Object.values(timers.current).forEach(clearTimeout);
                timers.current = {};
                console.log("Clearing all timers on unmount");
            };
        }, [errors, removeError]);

    return (
        <div className={classes.ErrorsBoxContainer}>
            {errors.map(error => (
                <StatusContent key={error.id} error={error} removeError={removeError} />
            ))}
        </div>
    );
}

export default StatusBox;
