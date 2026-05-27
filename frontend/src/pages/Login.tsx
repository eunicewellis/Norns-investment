import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Clear any existing admin token to avoid conflicts
        localStorage.removeItem('admin_authenticated');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user?.country) {
          localStorage.setItem('binexelite_country', data.user.country);
        }
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo auth-logo-dark">
            <i className="fas fa-chart-line"></i>
          </div>
          <h2 className="auth-title-gold">Welcome Back</h2>
          <p>Access your investment dashboard and manage your portfolio</p>
        </div>

        {error && <div className="alert alert-error"><i className="fas fa-exclamation-circle"></i> {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input type="email" id="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input type="password" id="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
          </div>
          <div className="form-options">
            <label className="form-remember"><input type="checkbox" /> Remember me</label>
            <Link to="/forgot-password" className="form-forgot">Forgot Password?</Link>
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading}>
            {isLoading ? <><i className="fas fa-spinner fa-spin"></i> Logging in...</> : 'Login'}
          </button>
        </form>

        <div className="auth-divider">or continue with</div>
        <div className="auth-social">
          <button className="auth-social-btn"><i className="fab fa-google"></i> Google</button>
          <button className="auth-social-btn"><i className="fab fa-facebook-f"></i> Meta</button>
          <button className="auth-social-btn"><i className="fab fa-apple"></i> Apple</button>
        </div>

        <div className="auth-footer">Don't have an account? <Link to="/register">Create one here</Link></div>
      </div>
    </div>
  );
};

export default Login;