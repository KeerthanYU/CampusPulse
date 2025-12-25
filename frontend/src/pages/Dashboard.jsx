import React from 'react';
import Navbar from '../components/Navbar';
import ChatWindow from '../components/ChatWindow';
import RoleSelector from '../components/RoleSelector';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <main className="app-shell" style={{marginTop:20}}>
        <div className="panel grid">
          <section className="home-panel panel">
            <h2>CampusPulse</h2>
            <p className="muted">AI-powered smart college helpdesk. Get instant answers for timetables, assignments, events, notices and more.</p>

            {user && (
              <div style={{marginTop:12, padding:12, borderRadius:12, background:'linear-gradient(90deg,#fafafa,#ffffff)'}}>
                <strong>Welcome, {user.name}.</strong>
                <div className="muted">You are signed in as {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Guest'}.</div>
              </div>
            )}

            {!role && (
              <div style={{marginTop:18}}>
                <div style={{fontWeight:600}}>Select your role to continue</div>
                <RoleSelector />
              </div>
            )}

            {role === 'student' && (
              <div style={{marginTop:18}}>
                <h3>Your Academic Overview</h3>
                <ul className="muted">
                  <li>Timetable</li>
                  <li>Assignments</li>
                  <li>Events & Notices</li>
                </ul>
              </div>
            )}

            {role === 'teacher' && (
              <div style={{marginTop:18}}>
                <h3>Class Tools</h3>
                <ul className="muted">
                  <li>Classes</li>
                  <li>Assignments Review</li>
                  <li>Post Notices</li>
                </ul>
              </div>
            )}

            {role === 'administrative' && (
              <div style={{marginTop:18}}>
                <h3>Admin Workspace</h3>
                <ul className="muted">
                  <li>Announcements</li>
                  <li>Grievance Overview</li>
                  <li>Manage Notices</li>
                </ul>
                <div style={{marginTop:12}}>
                  <button className="btn-primary" onClick={() => navigate('/student-records')}>View Student Records</button>
                </div>
              </div>
            )}
          </section>

          <aside className="chat-panel panel">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <div>
                <strong>Chat with CampusPulse</strong>
                <div className="muted">Role: {role || 'Not set'}</div>
              </div>
            </div>
            <ChatWindow />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
