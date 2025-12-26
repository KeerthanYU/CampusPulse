import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, googleLogin } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      await googleLogin(role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="app-shell">
        <div className="panel login-card">
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
            <div className="logo" style={{width:38,height:38,borderRadius:10}} />
            <div>
              <div style={{fontWeight:700,fontSize:18}}>CampusPulse</div>
            </div>
          </div>

          <h2 style={{marginTop:6}}>Create an account</h2>
          <p className="muted">Join CampusPulse — quick setup for students and staff.</p>

          <form onSubmit={handleSubmit} style={{marginTop:16}}>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" type="text" required />
              <input className="form-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email" required />
              <input className="form-input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Choose a password" type="password" required />

              <label style={{display:'flex',flexDirection:'column',gap:8}}>
                <div style={{fontSize:13,color:'var(--muted)'}}>Role</div>
                <select className="form-input" value={role} onChange={e=>setRole(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="administrative">Administrative</option>
                </select>
              </label>

              {error && <div className="error">{error}</div>}

              <div style={{display:'flex',gap:10,flexDirection:'column'}}>
                <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
                <button type="button" className="btn-google" onClick={handleGoogle} disabled={loading}>{loading ? 'Please wait...' : 'Sign up with Google'}</button>
              </div>

              <div style={{textAlign:'center',paddingTop:6,color:'var(--muted)'}}>
                Already have an account? <Link to="/login">Log in</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
