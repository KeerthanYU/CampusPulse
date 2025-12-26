import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await googleLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google login failed');
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

          <h2 style={{marginTop:6}}>Log in</h2>
          <p className="muted">Continue your experience with CampusPulse.</p>

          <form onSubmit={handleSubmit} style={{marginTop:16}}>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <input className="form-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email" required />
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <input className="form-input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required />
                <a className="forgot-link" href="#">Forgot</a>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <label className="remember-row"><input type="checkbox" /> Remember me for 30 days</label>
              </div>
              {error && <div className="error">{error}</div>}
              <button className="btn-primary" type="submit">Log in</button>
              <button type="button" className="btn-google" onClick={handleGoogle}>Sign in with Google</button>
              <div style={{textAlign:'center',paddingTop:6,color:'var(--muted)'}}>
                Don't have a CampusPulse account? <Link to="/register">Register now</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
