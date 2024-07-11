import React from 'react'
import classes from "./Logo.module.css"

function Logo() {
  return (
    <div className={classes.logoContainer}>
        <div className={classes.logoIcon}>U</div>
        <div>UmbaQuiz</div>
    </div>
  )
}

export default Logo