import React from 'react'
import classes from "./Footer.module.css"

function Footer() {
  return (
    <div className={classes.footer}>
        <div className={classes.footerContainer}>
            <div>2024</div>
            <div>Made by Ilia Turovchik</div>
            <div>https://github.com/Umbomax</div>
        </div>
    </div>
  )
}

export default Footer