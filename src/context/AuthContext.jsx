import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { isTokenExpired, clearLocalStorage } from '../Scripts/auth';
import { applyTheme, saveThemeToLocalStorage } from '../Scripts/themeChanger';
import { modern } from '../assets/themes';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
    

        if (token && storedUsername && !isTokenExpired(token)) {
            const decoded = jwtDecode(token);
            setIsLoggedIn(true); 
            setUsername(storedUsername);
            setUserRole(decoded.roles[0]); // Assuming roles is an array
        } else {
            clearLocalStorage();
        }
    }, []);

    const logIn = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const logOut = () => {
        clearLocalStorage();
        setIsLoggedIn(false);
        setUsername('');
        setUserRole('');
        localStorage.removeItem('selectedTheme');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        applyTheme(modern); 
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, userRole, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
