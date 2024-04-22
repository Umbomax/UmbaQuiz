import React from 'react'
import classes from './About.module.css'

function About() {
  return (
    <>
        <div className={classes.container}>
            <p>Данный проект явлеяется моим учебным проектом для изучения ReactJS и ExpressJs. На данный момент работает функционал добавления викторин типа "4 изображения", а так же решение данных викторин. Так же работает авторизация и регистрация пользователей.</p>
        </div>
    </>
  )
}

export default About