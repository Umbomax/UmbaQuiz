import React from "react";
import classes from "./ThemeSelection.module.css";
import { modern, pastel, dark, bright, calm, yellowBlack } from '../../assets/themes';
import { applyTheme, saveThemeToLocalStorage } from '../../Scripts/themeChanger';

function ThemeSelection() {
  const handleThemeChange = (theme, themeName) => {
    applyTheme(theme);
    saveThemeToLocalStorage(themeName);
  };

  return (
    <div className={classes.chooseThemeWrapper}>
      <div className={classes.chooseThemeContainer}>
        <h3>Выберите тему</h3>
        <div className={classes.chooseTheme}>
          <div className={classes.theme} onClick={() => handleThemeChange(modern, 'modern')}>
            <h4>Современный и яркий</h4>
            <div className={`${classes.themeImage} ${classes.modernTheme}`}></div>
          </div>
          <div className={classes.theme} onClick={() => handleThemeChange(pastel, 'pastel')}>
            <h4>Пастельные тона</h4>
            <div className={`${classes.themeImage} ${classes.pastelTheme}`}></div>
          </div>
          <div className={classes.theme} onClick={() => handleThemeChange(dark, 'dark')}>
            <h4>Темная тема</h4>
            <div className={`${classes.themeImage} ${classes.darkTheme}`}></div>
          </div>
          <div className={classes.theme} onClick={() => handleThemeChange(bright, 'bright')}>
            <h4>Яркая и контрастная</h4>
            <div className={`${classes.themeImage} ${classes.brightTheme}`}></div>
          </div>
          <div className={classes.theme} onClick={() => handleThemeChange(calm, 'calm')}>
            <h4>Спокойная и профессиональная</h4>
            <div className={`${classes.themeImage} ${classes.calmTheme}`}></div>
          </div>
          <div className={classes.theme} onClick={() => handleThemeChange(yellowBlack, 'yellowBlack')}>
            <h4>Желто-черная</h4>
            <div className={`${classes.themeImage} ${classes.yellowBlack}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeSelection;
