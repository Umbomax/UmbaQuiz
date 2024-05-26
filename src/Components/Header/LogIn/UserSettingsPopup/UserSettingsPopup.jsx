import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../UI/MyButton/MyButton';
import classes from './UserSettingsPopup.module.css';

function UserSettingsPopup({ popUp, setPopup, logOut }) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleBodyClick = () => {
            setPopup(false);
        };

        if (popUp) {
            document.body.addEventListener('click', handleBodyClick);
        } else {
            document.body.removeEventListener('click', handleBodyClick);
        }

        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, [popUp, setPopup]);

    return (
        <div className={`${classes.popup} ${popUp ? classes.active : ''}`} onClick={() => setPopup(false)}>
            <div className={classes.popupContent} onClick={(e) => e.stopPropagation()}>
                <MyButton onClick={() => {
                    navigate('/userSettings');
                    setPopup(false);
                }}>Профиль</MyButton>
                <MyButton onClick={() => {
                    logOut();
                    setPopup(false);
                }}>Выйти</MyButton>
            </div>
        </div>
    );
}

export default UserSettingsPopup;
