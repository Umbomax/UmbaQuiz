import React, { useState, useRef } from 'react';
import classes from './MyImageInput.module.css';

function MyImageInput({ formData, options }) {

  // Костыль ебаный пишу

  if(!formData){
    formData = new FormData();
  }

  // Костыль окончен

  const [drag, setDrag] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        if (options) {
          formData.append(`${options.num}.${options.type}`, file);
        } else {
          formData.append("quizHeadImage", base64String);
        }
        setImageSrc(base64String); // Установка изображения в состояние компонента
      };
      reader.readAsDataURL(file); // Преобразование изображения в строку base64
    }

    setDrag(false);
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        if (options) {
          formData.append(`${options.num}.${options.type}`, file);
        } else {
          formData.append("quizHeadImage", base64String);
        }
        setImageSrc(base64String); // Установка изображения в состояние компонента
      };
      reader.readAsDataURL(file); // Преобразование изображения в строку base64
    }
  }

  function handleImageClick() {
    fileInputRef.current.click();
  }

  return (
    <div className={classes.inputWrapper}>
      <input
        ref={fileInputRef}
        type="file"
        className={classes.input}
        onChange={handleInputChange}
        accept="image/*"
      />
      {imageSrc && (
        <div className={classes.imagePreview} onClick={handleImageClick}>
          <img src={imageSrc} alt="Uploaded" className={classes.image} />
        </div>
      )}
      {drag ? (
        <div
          className={classes.dropArea}
          onDragOver={dragStartHandler}
          onDragEnter={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={onDropHandler}
          onClick={handleImageClick}
        >
          Отпустите изображение, чтобы загрузить его
        </div>
      ) : (
        <div
          className={classes.startDrop}
          onDragOver={dragStartHandler}
          onDragEnter={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onClick={handleImageClick}
        >
          Перетащите изображение, чтобы загрузить его
        </div>
      )}
    </div>
  );
}

export default MyImageInput;