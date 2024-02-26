import React from 'react'
import classes from "./SearchQuizInput.module.css"

const SearchQuizInput = React.forwardRef((props, ref) => {
  return (
    <div className={classes.inputContainer}>
      <input ref={ref} className={classes.myInput} {...props}></input>
      <button className={classes.myBtn} type="submit"></button>
    </div>
    
  )
});

export default SearchQuizInput