import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { applyTheme, loadThemeFromLocalStorage } from './Scripts/themeChanger';
import  { modern, pastel, dark, bright, calm, yellowBlack, highContrast, gradient } from './assets/themes';

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
    case 'yellowBlack':
      applyTheme(yellowBlack);
      break;
    case 'highContrast':
      applyTheme(highContrast);
      break;
    case 'gradient':
      applyTheme(gradient);
      break;
    default:
      applyTheme(modern);
  }
} else {
  applyTheme(modern); 
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
