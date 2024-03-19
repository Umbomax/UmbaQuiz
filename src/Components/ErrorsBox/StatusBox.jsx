import React from "react";
import classes from "./StatusBox.module.css";
import ErrorContent from "../ErrorContent/ErrorContent";

function StatusBox({ errors, removeError }) {
    console.log(errors);
    console.log("Error box");

    return (
        <div className={classes.ErrorsBoxContainer}>
          
          
            {errors.map((error) =>
            (<ErrorContent key={error.id} error={error} removeError={removeError} />)
            )}
        </div>
    );
}

export default StatusBox;
