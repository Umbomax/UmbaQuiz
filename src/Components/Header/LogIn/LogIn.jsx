import React from 'react'
import classes from "./LogIn.module.css"
import UserIcon from '../../../assets/images/UserIcon.png';

function LogIn({ onClick}) {  
  return (
    <div onClick={onClick} className={classes.logInContainer}>
      <img src={UserIcon} alt="UserIcon" />   
                     
    </div>
  )
}

export default LogIn