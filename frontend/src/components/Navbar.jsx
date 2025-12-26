import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

// Navbar displays brand and profile actions
const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name ? user.name.slice(0,2).toUpperCase() : 'CP';

  return (
    <header className="navbar glass">
      <div className="nav-left">
        <div className="nav-logo">
          <div className="logo" />
          <span className="app-name">CampusPulse</span>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/student-records" className="nav-link">Records</Link>
        </nav>
      </div>

      <div className="nav-right">
        <div className="nav-actions">
          <ThemeToggle />
        </div>

        {user && (
          <div className="profile-menu">
            <button className="avatar" onClick={() => navigate('/profile')} title={user.name}>
              {user.avatar ? <img src={user.avatar} alt="avatar"/> : initials}
            </button>
            <div className="profile-dropdown">
              <div className="dropdown-item" style={{fontWeight:700}}>{user.name}</div>
              <div className="dropdown-item muted">Signed in as {role ? role.charAt(0).toUpperCase()+role.slice(1) : 'Guest'}</div>
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
