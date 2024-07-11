import React, { useState, useEffect } from "react";
import axios from 'axios';
import ThemeSelection from '../../Components/ThemeSelection/ThemeSelection';
import MyQuizzes from '../../Components/MyQuizzes/MyQuizzes'; 
import QuizesHistory from '../../Components/QuizesHistory/QuizesHistory'; 
import AllUsers from '../../Components/AllUsers/AllUsers';
import UserInfo from '../../Components/UserInfo/UserInfo'; 
import { loadThemeFromLocalStorage, applyTheme } from '../../Scripts/themeChanger';
import { modern, pastel, dark, bright, calm } from '../../assets/themes';
import classes from "./UserSettings.module.css";
import {jwtDecode} from 'jwt-decode';

const TABS = {
  SETTINGS: 'SETTINGS',
  MY_QUIZZES: 'MY_QUIZZES',
  HISTORY: 'HISTORY',
  ALL_USERS: 'ALL_USERS'
};

function UserSettings() {
  const [users, setUsers] = useState([]);
  const [currentTab, setCurrentTab] = useState(TABS.SETTINGS);
  const [currentUser, setCurrentUser] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');
  let userRole, userId;

  if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.roles[0];
    userId = decoded.id;
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data);

        const currentUserResponse = await axios.post(`${apiUrl}/getUser`, { user_id: userId });
        setCurrentUser(currentUserResponse.data);
      } catch (error) {
        console.error("Ошибка при получении пользователей или данных текущего пользователя:", error);
      }
    }

    fetchUsers();

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
  }, [userId]);

  const renderTabContent = () => {
    switch (currentTab) {
      case TABS.SETTINGS:
        return (
          <>
            <ThemeSelection />
            {currentUser && <UserInfo user={currentUser} setUser={setCurrentUser} />}
          </>
        );
      case TABS.MY_QUIZZES:
        return userRole !== 'USER' ? <MyQuizzes /> : null;
      case TABS.HISTORY:
        return userRole !== 'USER' ? <QuizesHistory /> : null;
      case TABS.ALL_USERS:
        return userRole === 'SUPERADMIN' ? <AllUsers users={users} setUsers={setUsers} /> : null;
      default:
        return (
          <>
            <ThemeSelection />
            {currentUser && <UserInfo user={currentUser} setUser={setCurrentUser} />}
          </>
        );
    }
  };

  return (
    <div className="mainContentBackground">
      <nav className={classes.nav}>
        <button onClick={() => setCurrentTab(TABS.SETTINGS)}>Настройки</button>
        {(userRole === 'ADMIN' || userRole === 'SUPERADMIN') && (
          <>
            <button onClick={() => setCurrentTab(TABS.MY_QUIZZES)}>Мои викторины</button>
            <button onClick={() => setCurrentTab(TABS.HISTORY)}>История</button>
          </>
        )}
        {userRole === 'SUPERADMIN' && (
          <button onClick={() => setCurrentTab(TABS.ALL_USERS)}>Все пользователи</button>
        )}
      </nav>
      {renderTabContent()}
    </div>
  );
}

export default UserSettings;
