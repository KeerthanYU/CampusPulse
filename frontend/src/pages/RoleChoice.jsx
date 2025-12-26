import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeatureCard from '../components/FeatureCard';

const RoleCard = ({ label, onClick }) => (
  <button className="role-card" onClick={onClick} style={{minWidth:140}}>
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
        <section className="hero">
          <div className="hero-content">
            <div className="hero-kicker">AI-powered • Smart Helpdesk</div>
            <h1 className="hero-title">Transforming Campus Support with <span className="accent-word">Pulse</span></h1>
            <p className="hero-sub muted">CampusPulse brings AI to your college helpdesk: faster responses, smarter routing, and happier students.</p>
            <div className="hero-ctas">
              <button className="btn-primary btn-cta">Get Started</button>
              <button className="btn-secondary">Explore Demo</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-panel panel">
              <h3 style={{margin:0}}>Quick actions</h3>
              <p className="muted">Ask a question, check timetable, or raise a grievance — AI helps streamline it all.</p>
            </div>
          </div>
        </section>

        <section className="features" style={{marginTop:28}}>
          <FeatureCard title="AI Triage" description="Automatically classify and route requests to the right team." icon={<div className="logo" style={{width:40,height:40}} />} />
          <FeatureCard title="Smart Replies" description="Instant suggested responses for common questions." icon={<div className="logo" style={{width:40,height:40}} />} />
          <FeatureCard title="Analytics" description="Track KPIs and identify bottlenecks with analytics." icon={<div className="logo" style={{width:40,height:40}} />} />
        </section>

        <div className="panel login-card" style={{maxWidth:760, marginTop:28}}>
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
