import React, { useState, useContext } from 'react';
import Logo from './Logo/Logo';
import LogIn from './LogIn/LogIn';
import NavPanel from './NavPanel/NavPanel';
import Auth from './Auth/Auth';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import classNames from './Header.module.css';
import { AuthContext } from '../../context/AuthContext';

function Header({ createError }) {
    const [modal, setModal] = useState(false);
    const [popUp, setPopup] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { isLoggedIn, username, logOut } = useContext(AuthContext);

    const chooseRoute = () => {
        if (isLoggedIn) {
            setPopup(true);
        } else {
            setModal(true);
        }
    };

    const logIn = (e) => {
        e.stopPropagation();
        chooseRoute();
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    return (
        <header className={classNames.header}>
      
            <BurgerMenu onClick={toggleNav} isNavOpen={isNavOpen} />
            
            <Logo className={classNames.logo}/>
            <NavPanel isOpen={isNavOpen} toggleNav={toggleNav} closeNav={closeNav} />
            <LogIn 
                isLoggedIn={isLoggedIn} 
                username={username} 
                logIn={logIn} 
                popUp={popUp} 
                setPopup={setPopup} 
                logOut={logOut}
            />
            <Auth visible={modal} setVisible={setModal} createError={createError} />
        </header>
    );
}

export default Header;
