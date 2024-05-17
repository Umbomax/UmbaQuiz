import React, { useState, useEffect } from "react";
import axios from 'axios';
import clases from "./UserSettings.module.css";
import { modern, pastel, dark, bright, calm } from '../../assets/themes'; // Убедитесь в правильном пути
import { applyTheme, saveThemeToLocalStorage, loadThemeFromLocalStorage } from '../../Scripts/themeChanger';

function UserSettings() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("https://umbaquizserver-production.up.railway.app/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();

    // Загрузите и примените сохраненную тему при загрузке компонента
    const savedTheme = loadThemeFromLocalStorage();
    if (savedTheme) {
      switch (savedTheme) {
        case 'modern':
          applyTheme(modern);
          break;
        case 'pastel':
          applyTheme(pastel);
          break;
        case 'dark':
          applyTheme(dark);
          break;
        case 'bright':
          applyTheme(bright);
          break;
        case 'calm':
          applyTheme(calm);
          break;
        default:
          applyTheme(modern);
      }
    }
  }, []);

  const handleThemeChange = (theme, themeName) => {
    applyTheme(theme);
    saveThemeToLocalStorage(themeName);
  };

  return (
    < >
      <div className={clases.chooseThemeWrapper}>
        <div className={clases.chooseThemeContainer}>
          <h3>Выберите тему</h3>
          <div className={clases.chooseTheme}>
            <div className={clases.theme} onClick={() => handleThemeChange(modern, 'modern')}>
              <h4>Современный и яркий</h4>
              <div className={`${clases.themeImage} ${clases.modernTheme}`}></div>
            </div>
            <div className={clases.theme} onClick={() => handleThemeChange(pastel, 'pastel')}>
              <h4>Пастельные тона</h4>
              <div className={`${clases.themeImage} ${clases.pastelTheme}`}></div>
            </div>
            <div className={clases.theme} onClick={() => handleThemeChange(dark, 'dark')}>
              <h4>Темная тема</h4>
              <div className={`${clases.themeImage} ${clases.darkTheme}`}></div>
            </div>
            <div className={clases.theme} onClick={() => handleThemeChange(bright, 'bright')}>
              <h4>Яркая и контрастная</h4>
              <div className={`${clases.themeImage} ${clases.brightTheme}`}></div>
            </div>
            <div className={clases.theme} onClick={() => handleThemeChange(calm, 'calm')}>
              <h4>Спокойная и профессиональная</h4>
              <div className={`${clases.themeImage} ${clases.calmTheme}`}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={clases.userinfoWrapper}>
        {/* TODO вынести infoContainer в отдельный компонент */}
        <div className={clases.infoContainer}>
          <div className={clases.left}>
            <div className={clases.fieldName}>Имя пользователя</div>
            <div className={clases.name}></div>
          </div>
          <div className={clases.right}>
            <button>Редактировать</button>
          </div>
        </div>
        <div className={clases.infoContainer}>
          <div className={clases.left}>
            <div className={clases.fieldName}>Эл. почта</div>
            <div className={clases.name}></div>
          </div>
          <div className={clases.right}>
            <button>Редактировать</button>
          </div>
        </div>
        <div className={clases.infoContainer}>
          <div className={clases.left}>
            <div className={clases.fieldName}>Тип пользователя</div>
          </div>
          <div className={clases.right}>
            <div>User</div>
          </div>
        </div>
      </div>
      <div className={clases.allUsers}>
        {users.map((user, idx) => (
          <div key={idx} className={clases.userInfo}>
            <div>{user._id}</div>
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserSettings;
