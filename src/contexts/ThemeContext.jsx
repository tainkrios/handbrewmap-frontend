import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dark')) || false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(dark));
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useTheme = () => useContext(ThemeContext);
