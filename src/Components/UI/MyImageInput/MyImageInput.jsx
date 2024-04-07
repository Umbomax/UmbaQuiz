import React, { useState, useRef } from 'react';
import classes from './MyImageInput.module.css';
import Resizer from 'react-image-file-resizer';

function MyImageInput({setHeadImage, questionIndex, answerIndex}) {
  

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
      Resizer.imageFileResizer(
        file,
        430, // новая ширина изображения
        270, // новая высота изображения
        'JPEG', // формат изображения (JPEG, PNG, WEBP)
        70, // качество изображения (0-100)
        0, // вращение изображения
        (uri) => {
          setHeadImage(uri, questionIndex, answerIndex);
          setImageSrc(uri);
          const imageSizeInBytes = uri.length * 0.75; // Переводим длину строки base64 в байты

          // Переводим размер изображения в мегабайты
          const imageSizeInMB = imageSizeInBytes / (1024 * 1024);
  
          console.log('Размер изображения в мегабайтах:', imageSizeInMB);
        },
        'base64' // тип вывода ('base64', 'blob', 'file')
      );
      // const reader = new FileReader();
      // reader.onload = () => {
      //   const base64String = reader.result;
      //   setHeadImage(base64String)
       
      //   setImageSrc(base64String); // Установка изображения в состояние компонента
      // };
      // reader.readAsDataURL(file); // Преобразование изображения в строку base64
    }

    setDrag(false);
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      Resizer.imageFileResizer(
        file,
        430, // новая ширина изображения
        270, // новая высота изображения
        'JPEG', // формат изображения (JPEG, PNG, WEBP)
        70, // качество изображения (0-100)
        0, // вращение изображения
        (uri) => {
          setHeadImage(uri, questionIndex, answerIndex);
          setImageSrc(uri);
        },
        'base64' // тип вывода ('base64', 'blob', 'file')
      );
    }
  }
  // function handleInputChange(e) {
  //   const file = e.target.files[0];
  //   if (file && file.type.startsWith('image/')) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const base64String = reader.result;
  //       setHeadImage(base64String, questionIndex, answerIndex)

  //       setImageSrc(base64String); // Установка изображения в состояние компонента
  //     };
  //     reader.readAsDataURL(file); // Преобразование изображения в строку base64
  //   }
  // }

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