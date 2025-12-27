import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockLogin } from '../utils/mockAuth';
import { signInWithGoogle, loginUser } from '../services/authService';
import { extractClass } from '../utils/intentDetector';

// AuthContext provides login state, user and role management
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { name, email }
  const [role, setRole] = useState(null); // 'student' | 'teacher' | 'administrative'
  const [studentClass, setStudentClass] = useState(null); // e.g., "CSE 3 B"

  // restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cp_auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user || null);
        setRole(parsed.role || null);
        setStudentClass(parsed.studentClass || null);
      }
    } catch (err) {
      console.error('Error restoring auth from localStorage:', err);
    }
  }, []);

  useEffect(() => {
    const payload = { user, role, studentClass };
    try { localStorage.setItem('cp_auth', JSON.stringify(payload)); } catch (e) {}
  }, [user, role, studentClass]);

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
      // res is expected to be { user: { displayName, email }, role }
      setUser({ name: res.user.displayName || res.user.email.split('@')[0], email: res.user.email });
      setRole(res.role || null);
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

  /**
   * Store student's class/section
   * Called when user says "I am in CSE 3 B" or similar
   * Extracts class identifier from message and stores in state + localStorage
   */
  const setClass = (classMessage) => {
    try {
      const extracted = extractClass(classMessage);
      if (extracted) {
        setStudentClass(extracted);
        console.log('Student class set to:', extracted);
        return extracted;
      } else {
        console.warn('Could not extract class from message:', classMessage);
        return null;
      }
    } catch (err) {
      console.error('Error setting student class:', err);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setStudentClass(null);
    try { localStorage.removeItem('cp_auth'); } catch (e) {}
  };

  const value = {
    user,
    role,
    studentClass,
    setRole,
    setClass,
    login,
    register,
    googleLogin,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
