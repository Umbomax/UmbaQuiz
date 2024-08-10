import React from "react";
import classes from "./MyQuizzes.module.css"
import { useNavigate} from "react-router-dom";

function MyQuizzes() {
  const navigate = useNavigate();

  return <>
  
  <div className={classes.createQuiz} onClick={() => navigate("/createQuiz")}>
    <h3 className={classes.header}>Новая викторина</h3>
    <div className={classes.addQuizIcon}>+</div>
  </div>
  </>;
}

export default MyQuizzes;