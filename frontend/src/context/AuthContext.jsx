import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockLogin } from '../utils/mockAuth';

// AuthContext provides login state, user and role management
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email }
  const [role, setRole] = useState(null); // 'student' | 'teacher' | 'administrative'

  // restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cp_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user || null);
        setRole(parsed.role || null);
      }
    } catch (err) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const payload = { user, role };
    try { localStorage.setItem('cp_auth', JSON.stringify(payload)); } catch (e) {}
  }, [user, role]);

  const login = async (email, password) => {
    // mockLogin simulates auth; returns user object
    const res = await mockLogin(email, password);
    setUser(res);
    return res;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    try { localStorage.removeItem('cp_auth'); } catch (e) {}
  };

  const value = { user, role, setRole, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
