import React, { useState } from 'react';
import classes from './MyImageInput.module.css';

function MyImageInput({ formData, options }) {
  const [drag, setDrag] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

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
      reader.onload = function (event) {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
      formData.append(`${options.num}.${options.type}`, file);
    }

    setDrag(false);
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setImageSrc(event.target.result);
      };
      reader.readAsDataURL(file);
      formData.append(`${options.num}.${options.type}`, file);
    }
  }

  return (
    <div className={classes.inputWrapper}>
      <input
        type="file"
        className={classes.input}
        onChange={handleInputChange}
        multiple
        accept="image/*"
      />
      {imageSrc && (
        <div className={classes.imagePreview}>
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
        >
          Отпустите изображение, чтобы загрузить его
        </div>
      ) : (
        <div
          className={classes.startDrop}
          onDragOver={dragStartHandler}
          onDragEnter={dragStartHandler}
          onDragLeave={dragLeaveHandler}
        >
          Перетащите изображение, чтобы загрузить его
        </div>
      )}
    </div>
  );
}

export default MyImageInput;