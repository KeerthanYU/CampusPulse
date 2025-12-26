import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockLogin } from '../utils/mockAuth';
import { signInWithGoogle, loginUser } from '../services/authService';

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
    // try real auth first
    try {
      const res = await loginUser(email, password);
      setUser({ name: res.user.displayName || res.user.email.split('@')[0], email: res.user.email });
      setRole(res.role || null);
      return res;
    } catch (err) {
      // fallback to mock
      const res = await mockLogin(email, password);
      setUser(res);
      return res;
    }
  };

  const register = async (name, email, password, role = 'student') => {
    // call backend to create user
    const resp = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.message || 'Registration failed');
    }

    // sign in client-side using existing authService loginUser which will fetch role from backend
    const res = await loginUser(email, password);
    setUser({ name: res.user.displayName || res.user.email.split('@')[0], email: res.user.email });
    setRole(res.role || null);
    return { user: res.user, role: res.role };
  };

  const googleLogin = async (role = undefined) => {
    const res = await signInWithGoogle(role);
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
