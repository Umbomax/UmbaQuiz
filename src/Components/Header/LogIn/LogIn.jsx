import React from 'react'
import classes from "./LogIn.module.css"
import UserIcon from '../../../assets/images/UserIcon.png';

function LogIn({ onClick, children}) { 
  
  console.log(children)

  return (
    <div onClick={onClick} className={classes.logInContainer}>
      <img src={UserIcon} alt="UserIcon" />   
      {children}          
    </div>
  )
}

export default LogIn