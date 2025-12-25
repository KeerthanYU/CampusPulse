import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, role } = useAuth();
  return (
    <div>
      <Navbar />
      <main className="app-shell" style={{marginTop:20}}>
        <div className="panel" style={{maxWidth:720}}>
          <h2>Profile</h2>
          <p className="muted">Name: {user?.name}</p>
          <p className="muted">Email: {user?.email}</p>
          <p className="muted">Role: {role || 'Not set'}</p>
        </div>
      </main>
    </div>
  );
};

export default Profile;
