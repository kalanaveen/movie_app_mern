import React, { createContext } from 'react';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const toggleTheme = () => {
    // document.documentElement.classList.add('')
    console.log(document.documentElement);
  };
  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

