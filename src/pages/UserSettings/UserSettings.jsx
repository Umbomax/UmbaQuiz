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
import { jwtDecode } from 'jwt-decode';

const TABS = {
  SETTINGS: 'SETTINGS',
  MY_QUIZZES: 'MY_QUIZZES',
  HISTORY: 'HISTORY',
  ALL_USERS: 'ALL_USERS'
};

function UserSettings() {
  const [users, setUsers] = useState([]);
  const [currentTab, setCurrentTab] = useState(TABS.SETTINGS);
  const [currentUser, setCurrentUser] = useState(null); // For current user's data

  let userRole;
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    userRole = decoded.roles[0]; // Use the first role from the roles array
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get("https://umbaquizserver-production.up.railway.app/api/users");
        setUsers(response.data);
        // Assuming you have an API endpoint to get the current user's data
        const currentUserResponse = await axios.get("https://umbaquizserver-production.up.railway.app/api/users/current");
        setCurrentUser(currentUserResponse.data);
       
      } catch (error) {
        console.error("Error fetching users or current user data:", error);
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
  }, []);

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
    <div>
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
