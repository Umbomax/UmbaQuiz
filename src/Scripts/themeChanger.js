export const applyTheme = (theme) => {
    const root = document.documentElement;
    Object.keys(theme).forEach(key => {
      root.style.setProperty(key, theme[key]);
    });
  };
  
  export const saveThemeToLocalStorage = (themeName) => {
    localStorage.setItem('selectedTheme', themeName);
  };
  
  export const loadThemeFromLocalStorage = () => {
    return localStorage.getItem('selectedTheme');
  };
  