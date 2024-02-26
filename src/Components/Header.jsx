import React from "react";
import Logo from "./Header/Logo/Logo";
import LogIn from "./Header/LogIn/LogIn";
import SearchQuizInput from "./Header/SearchQuizInput/SearchQuizInput";
import RegistrationModal from "./Header/Auth/Auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const chooseRoute = () => {
        const token = localStorage.getItem('token');
        if(token) {
            navigate('/userSettings')
        }else {
            setModal(true);
        }

    }

    return (
        <header>
            <Logo></Logo>
            <SearchQuizInput></SearchQuizInput>
            <LogIn
                onClick={chooseRoute}
            ></LogIn>
            <RegistrationModal visible={modal} setVisible={setModal}></RegistrationModal>
        </header>
    );
}

export default Header;
