import React from "react";
import axios from 'axios';
import {useState, useEffect } from "react";
import clases from "./UserSettings.module.css"
function UserSettings() {

        const [users, setUsers] = useState([])

        useEffect(() => {
            async function fetchQuizes() {
                try {
                    const response = await axios.get("http://localhost:3030/api/users");
                    
                    setUsers(response.data);
                    console.log(users);
                } catch (error) {
                    console.error("Error fetching users:", error);                
                }
            }
    
            fetchQuizes();
        }, []);
        return (
            < >
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
                    {users.map((user,idx)=>(
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
