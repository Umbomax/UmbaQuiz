import React from "react";
import { useState } from "react";
import classes from "./LogibForm.module.css";
import MyInput from "../../../UI/MyInput/MyInput";
function LoginForm() {

    const [formData, setFormData] = useState({username:"", password:""})

    const login = async(e) =>{
      e.preventDefault();  

      await fetch("http://localhost:3030/api/login",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }        
        return response.json();
      })
      .then(data => {
        localStorage.setItem('UserName',data.username)
        localStorage.setItem('token',data.token)
        localStorage.setItem('roles',JSON.stringify(data.roles))        
      })
      .catch(error => {
        // Обработка ошибок при выполнении запроса
        console.error('There was a problem with your fetch operation:', error);
      });
      
    }

    return (
      <>
        <form className={classes.form} action="" method="get">
            <div className={classes.inputContainer}>
                <MyInput className={classes.formInput} type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
            </div>
            <div className={classes.inputContainer}>
                <MyInput className={classes.formInput} type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
            </div>
            <button className={classes.formBtn} type="button" onClick={login}>
                Log In
            </button>
        </form>
      </>
    );
}

export default LoginForm;
