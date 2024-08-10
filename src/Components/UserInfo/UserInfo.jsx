import React, { useState } from "react";
import axios from 'axios';
import classes from "./UserInfo.module.css";

function UserInfo({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Update user details
      await axios.put(`${apiUrl}/users/${user._id}`, {
        username: formData.username,
        email: formData.email
      });

      // If passwords are filled, change password
      if (formData.oldPassword && formData.newPassword && formData.newPassword === formData.confirmPassword) {
        await axios.put(`${apiUrl}/users/${user._id}/password`, {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        });
      }

      setUser({ ...user, username: formData.username, email: formData.email });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user details or changing password:", error);
    }
  };

  return (
    <div className={classes.userInfoWrapper}>
      {isEditing ? (
        <>
          <div className={classes.infoContainer}>
            <div className={classes.left}>
              <div className={classes.fieldName}>Имя пользователя</div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.left}>
              <div className={classes.fieldName}>Эл. почта</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.left}>
              <div className={classes.fieldName}>Старый пароль</div>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.left}>
              <div className={classes.fieldName}>Новый пароль</div>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.left}>
              <div className={classes.fieldName}>Повторите новый пароль</div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => setIsEditing(false)}>Отмена</button>
        </>
      ) : (
        <>
          <div className={classes.infoContainer}>
            <div className={classes.left}>
              <div className={classes.fieldName}>Имя пользователя</div>
              <div className={classes.name}>{user.username}</div>
            </div>
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.left}>
              <div className={classes.fieldName}>Эл. почта</div>
              <div className={classes.name}>{user.email}</div>
            </div>
          </div>
          <button onClick={() => setIsEditing(true)}>Редактировать</button>
        </>
      )}
    </div>
  );
}

export default UserInfo;
