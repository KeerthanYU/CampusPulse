import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleCard = ({ label, onClick }) => (
  <button className="role-card" onClick={onClick} style={{minWidth:160}}>
    {label}
  </button>
);

const RoleChoice = () => {
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const choose = (r) => {
    setRole(r);
    navigate('/login');
  };

  return (
    <div className="login-bg">
      <div className="app-shell">
        <div className="panel login-card" style={{maxWidth:760}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <div className="logo" style={{width:46,height:46,borderRadius:12}} />
              <h2 style={{marginTop:8}}>Welcome to CampusPulse</h2>
              <p className="muted">Select your role to continue — this helps tailor the experience.</p>
            </div>
          </div>

          <div style={{display:'flex',gap:16,marginTop:20}}>
            <RoleCard label="Student" onClick={() => choose('student')} />
            <RoleCard label="Teacher" onClick={() => choose('teacher')} />
            <RoleCard label="Administrative" onClick={() => choose('administrative')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleChoice;
