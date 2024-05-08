import React, {useEffect} from 'react'
import classes from "./StatusContent.module.css"



function StatusContent({error, removeError}) {

    useEffect(() => {
        const timer = setTimeout(() => {
            removeError(error);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [error, removeError]);



  return (
    <div className={classes.container} >
        <button className={classes.btn} onClick={(e)=>{
            e.preventDefault();
            removeError(error)
        }}>X</button>
        <div className={classes.errorText}>{error.errorText}</div>
    </div>
  )
}

export default StatusContent