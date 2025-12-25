import React from 'react';
import { useAuth } from '../context/AuthContext';

// RoleSelector allows user to pick exactly one role after login
const RoleSelector = () => {
  const { setRole } = useAuth();

  return (
    <div style={{display:'flex',gap:12,marginTop:12}}>
      <button className="role-card" onClick={() => setRole('student')}>Student</button>
      <button className="role-card" onClick={() => setRole('teacher')}>Teacher</button>
      <button className="role-card" onClick={() => setRole('administrative')}>Administrative</button>
    </div>
  );
};

export default RoleSelector;
