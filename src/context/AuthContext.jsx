import React, { createContext, useState, useEffect } from 'react';
import { isTokenExpired, clearLocalStorage } from '../Scripts/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');

        if (token && storedUsername && !isTokenExpired(token)) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
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
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
