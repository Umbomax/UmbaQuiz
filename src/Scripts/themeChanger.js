export const applyTheme = (theme) => {
    const root = document.documentElement;
    console.log('theme in foo applyTheme')
    console.log(theme)
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
  