import React from 'react'
import classes from "./ImageContainer.module.css"
import noImage from '../../assets/images/no_image.jpg'; 
function ImageContainer({src, altName}) {
  return (
    <div className={classes.imageContainer}>
    <div className={classes.blurredBackground} style={{ backgroundImage: `url(${src})` }}></div>
    <img src={src||noImage} className={classes.quizHeadImg} alt={altName} />
    </div>
  )
}

export default ImageContainer