import React, {useEffect} from 'react'
import classes from "./ErrorContent.module.css"



function ErrorContent({error, removeError}) {

    useEffect(() => {
        const timer = setTimeout(() => {
            removeError(error);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [error, removeError]);

    // useEffect(() => {
    //     const currentTime = Date.now()/1000;
    //     const errorTime = error.id/1000;
    //     const timeDifference =  currentTime - errorTime;
    //     console.log(timeDifference)
    //     if (timeDifference > 5) {
    //         const timer = setTimeout(() => {
    //             removeError(error.id);
    //         }, 0);

    //         return () => {
    //             clearTimeout(timer);
    //         };
    //     }
    // }, [error, removeError]);


  return (
    <div className={classes.container} >
        <button className={classes.btn} onClick={(e)=>{
            e.preventDefault();
            removeError(error)
            console.log("we are in delete error")
        }}>X</button>
        <div className={classes.errorText}>{error.errorText}</div>
    </div>
  )
}

export default ErrorContent