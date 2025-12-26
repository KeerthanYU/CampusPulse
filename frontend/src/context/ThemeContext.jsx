import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const THEME_KEY = 'campuspulse_theme';

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch (e) {}
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => getInitialTheme());

  // Keep document class in sync and persist preference
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('theme-dark');
    else root.classList.remove('theme-dark');
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }, [theme]);

  // Listen to system changes and update only if the user hasn't explicitly set a preference
  useEffect(() => {
    let mql;
    try {
      mql = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = e => {
        try {
          const stored = localStorage.getItem(THEME_KEY);
          if (stored !== 'light' && stored !== 'dark') {
            setTheme(e.matches ? 'dark' : 'light');
          }
        } catch (err) {}
      };
      if (mql && mql.addEventListener) mql.addEventListener('change', onChange);
      else if (mql && mql.addListener) mql.addListener(onChange);
      return () => {
        if (mql && mql.removeEventListener) mql.removeEventListener('change', onChange);
        else if (mql && mql.removeListener) mql.removeListener(onChange);
      };
    } catch (e) {}
  }, []);

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
