import React from 'react'
import classes from "./NavPanel.module.css"
import { useNavigate } from "react-router-dom";

function NavPanel() {
    const navigate = useNavigate();


  return (
    <nav className={classes.navContainer}>
        <div className={classes.navItem} onClick={()=>{navigate("/")}}>Главная</div>
        <div className={classes.navItem} onClick={()=>{navigate("/about")}}>О проекте</div>
    </nav>
  )
}

export default NavPanel