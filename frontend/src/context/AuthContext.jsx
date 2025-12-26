import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockLogin } from '../utils/mockAuth';
import { signInWithGoogle } from '../services/authService';

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

  const register = async (name, email, password, role = 'student') => {
    // simulate server latency and user creation
    await new Promise((r) => setTimeout(r, 400));
    const userObj = { name, email };
    setUser(userObj);
    setRole(role);
    return { user: userObj, role };
  };

  const googleLogin = async () => {
    const res = await signInWithGoogle();
    // res: { user, role }
    const userObj = { name: res.user.displayName || '', email: res.user.email };
    setUser(userObj);
    setRole(res.role || null);
    return res;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    try { localStorage.removeItem('cp_auth'); } catch (e) {}
  };

  const value = { user, role, setRole, login, register, googleLogin, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
