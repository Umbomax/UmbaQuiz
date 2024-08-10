import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import {jwtDecode} from 'jwt-decode';
import classes from "./Support.module.css";

function Support() {
  const [topic, setTopic] = useState('account');
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({ name: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded)
      setUserData({ name: decoded.username, email: decoded.email });
    }
  }, []);

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const templateParams = {
      topic: topic,
      message: message,
      user_name: userData.name,
      user_email: userData.email,
    };
    console.log(templateParams)
    emailjs.send('service_2rba3rb', 'template_ybagrmb', templateParams, 'ZRonK_SntvV0t-bjW')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Ваше сообщение отправлено!');
      }, (error) => {
        console.error('FAILED...', error);
        alert('Произошла ошибка при отправке сообщения.');
      });
  };

  return (
    <div className={classes.supportContainer}>
      <h2>Поддержка</h2>
      <form onSubmit={handleSubmit} className={classes.supportForm}>
        <div className={classes.formGroup}>
          <label htmlFor="topic">Тема:</label>
          <select id="topic" value={topic} onChange={handleTopicChange}>
            <option value="account">Проблемы с аккаунтом</option>
            <option value="bug">Ошибки в работе приложения</option>
            <option value="suggestion">Предложения по улучшению</option>
            <option value="admin">Получение прав администратора</option>
          </select>
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="message">Сообщение:</label>
          <textarea id="message" value={message} onChange={handleMessageChange} rows="6"></textarea>
        </div>
        <button type="submit" className={classes.submitButton}>Отправить</button>
      </form>
    </div>
  );
}

export default Support;
