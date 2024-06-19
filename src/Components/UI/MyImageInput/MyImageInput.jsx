import React, { useState, useRef } from 'react';
import Resizer from 'react-image-file-resizer';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import classes from './MyImageInput.module.css';

function MyImageInput({ setHeadImage, questionIndex, answerIndex, handleImageRemoval }) {
  const [drag, setDrag] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLink, setImageLink] = useState("");
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
        430,
        270,
        'JPEG',
        100,
        0,
        (uri) => {
          setHeadImage(uri, questionIndex, answerIndex);
          setImageSrc(uri);
        },
        'base64'
      );
    }

    setDrag(false);
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      Resizer.imageFileResizer(
        file,
        430,
        270,
        'JPEG',
        70,
        0,
        (uri) => {
          setHeadImage(uri, questionIndex, answerIndex);
          setImageSrc(uri);
        },
        'base64'
      );
    }
  }

  function handleImageClick(e) {
    e.stopPropagation()
    fileInputRef.current.click();
  }

  function handleImageLinkChange(e) {
    setImageLink(e.target.value);
  }

  function handleImageLinkSubmit() {
    setHeadImage(imageLink, questionIndex, answerIndex);
    setImageSrc(imageLink);
  }

  function handleRemoveImage(e) {
    e.stopPropagation();
    setImageSrc(null);
    handleImageRemoval(questionIndex, answerIndex);
  }

  return (
    <div className={classes.inputWrapper}>
      <input
        ref={fileInputRef}
        type="file"
        className={classes.input}
        onChange={handleInputChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      {imageSrc && (
        <div className={classes.imagePreview} onClick={handleImageClick}>
          <img src={imageSrc} alt="Uploaded" className={classes.image} />
          <div className={classes.iconWrapper}>
            <FaPencilAlt className={classes.icon} onClick={handleImageClick} />
            <FaTrashAlt className={classes.icon} onClick={handleRemoveImage} />
          </div>
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
      <div className={classes.linkInputWrapper}>
        <input
          type="text"
          placeholder="Вставьте ссылку на изображение"
          value={imageLink}
          onChange={handleImageLinkChange}
        />
        <button type="button" onClick={handleImageLinkSubmit}>
          Загрузить
        </button>
      </div>
    </div>
  );
}

export default MyImageInput;
