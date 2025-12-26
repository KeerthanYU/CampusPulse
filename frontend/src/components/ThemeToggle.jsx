import React from 'react';
import { useTheme } from '../context/ThemeContext';

const SunSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="3.6" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M12 2.5v1.8" />
      <path d="M12 19.7v1.8" />
      <path d="M5.1 5.1l1.2 1.2" />
      <path d="M17.7 17.7l1.2 1.2" />
      <path d="M2.5 12h1.8" />
      <path d="M19.7 12h1.8" />
      <path d="M5.1 18.9l1.2-1.2" />
      <path d="M17.7 6.3l1.2-1.2" />
    </g>
  </svg>
);

const MoonSvg = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
  </svg>
);

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      className={`theme-toggle-pill ${theme === 'dark' ? 't-dark' : 't-light'}`}
      onClick={toggle}
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label="Toggle light and dark theme"
    >
      <span className="track" aria-hidden>
        <span className="knob" aria-hidden>
          <span className="icon icon-sun" aria-hidden><SunSvg /></span>
          <span className="icon icon-moon" aria-hidden><MoonSvg /></span>
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;
