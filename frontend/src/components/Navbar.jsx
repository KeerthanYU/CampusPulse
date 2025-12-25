import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Navbar displays brand and profile actions
const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name ? user.name.slice(0,2).toUpperCase() : 'CP';

  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="nav-logo">
          <div className="logo" />
          <span className="app-name">CampusPulse</span>
        </div>
      </div>

      <div className="nav-right">
        {user && (
          <div className="profile-menu">
            <button className="avatar" onClick={() => navigate('/profile')} title={user.name}>
              {user.avatar ? <img src={user.avatar} alt="avatar"/> : initials}
            </button>
            <div className="profile-dropdown">
              <div className="dropdown-item">{user.name}</div>
              <div className="dropdown-item muted">Role: {role || 'Not set'}</div>
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
