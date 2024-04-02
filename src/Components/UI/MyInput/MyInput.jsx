import React, { useState } from 'react'
import classes from "./MyInput.module.css"

const MyInput = React.forwardRef(({formData, idx, props, ref}) => {

  const [text, setText] = useState('')

  console.log(idx)

  return (

    <input ref={ref} className={classes.myInput} {...props} onChange={(e)=>{
      setText(e.target.value)
      formData.set(`${idx}.questionText`, text)      
    }}></input>
  )
});

export default MyInput