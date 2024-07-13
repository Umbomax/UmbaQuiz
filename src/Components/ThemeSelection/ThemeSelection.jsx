import React from "react";
import classes from "./ThemeSelection.module.css";
import { modern, pastel, dark, bright, calm, yellowBlack } from '../../assets/themes';
import { applyTheme, saveThemeToLocalStorage } from '../../Scripts/themeChanger';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const apiUrl = process.env.REACT_APP_API_URL;

function ThemeSelection() {
  const token = localStorage.getItem('token');
  let userId;

  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }

  const handleThemeChange = async (theme, themeName) => {
    applyTheme(theme);
    saveThemeToLocalStorage(themeName);

    try {
      await axios.put(`${apiUrl}/updateUser`, { user_id: userId, updateData: { theme: themeName } });
    } catch (error) {
      console.error("Ошибка при обновлении темы пользователя:", error);
    }
  };

  return (
    <div className={classes.themeSelection}>
      <h3>Выберите тему:</h3>
      <div className={classes.themeContainer}>
        <div className={classes.theme} onClick={() => handleThemeChange(modern, 'modern')}>
          <h4>Модерн</h4>
          <div className={`${classes.themeImage} ${classes.modernTheme}`}></div>
        </div>
        <div className={classes.theme} onClick={() => handleThemeChange(pastel, 'pastel')}>
          <h4>Пастельная</h4>
          <div className={`${classes.themeImage} ${classes.pastelTheme}`}></div>
        </div>
        <div className={classes.theme} onClick={() => handleThemeChange(dark, 'dark')}>
          <h4>Темная</h4>
          <div className={`${classes.themeImage} ${classes.darkTheme}`}></div>
        </div>
        <div className={classes.theme} onClick={() => handleThemeChange(bright, 'bright')}>
          <h4>Яркая</h4>
          <div className={`${classes.themeImage} ${classes.brightTheme}`}></div>
        </div>
        <div className={classes.theme} onClick={() => handleThemeChange(calm, 'calm')}>
          <h4>Спокойная</h4>
          <div className={`${classes.themeImage} ${classes.calmTheme}`}></div>
        </div>
        <div className={classes.theme} onClick={() => handleThemeChange(yellowBlack, 'yellowBlack')}>
          <h4>Желто-черная</h4>
          <div className={`${classes.themeImage} ${classes.yellowBlackTheme}`}></div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSelection;
