import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const t = savedTheme || 'dark';
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light';
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  const getLinks = () => {
    const baseLinks = [
      { p: '/about', l: 'About' },
      { p: '/markets', l: 'Markets' },
      { p: '/faq', l: 'FAQ' },
      { p: '/support', l: 'Support' }
    ];
    if (isLoggedIn) {
      return [{ p: '/dashboard', l: 'Dashboard' }, ...baseLinks];
    }
    return [{ p: '/', l: 'Home' }, ...baseLinks];
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="navbar-logo-icon">
              <i className="fas fa-chart-line"></i>
            </span>
            <span className="navbar-logo-text">BINEXELITE</span>
          </Link>

          <div className="navbar-links">
            {getLinks().map(l => (
              <Link key={l.p} to={l.p} className={`navbar-link ${location.pathname === l.p ? 'active' : ''}`}>
                {l.l}
              </Link>
            ))}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
            {isLoggedIn ? (
              <button className="btn btn-primary btn-sm" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
              </>
            )}
          </div>

          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <span className="navbar-logo-text">BINEXELITE</span>
          <button className="mobile-menu-close" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {getLinks().map(l => (
          <Link key={l.p} to={l.p} className={`mobile-link ${location.pathname === l.p ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
            {l.l}
          </Link>
        ))}
        <div className="mobile-divider"></div>
        <div className="mobile-link" onClick={() => { toggleTheme(); setIsMenuOpen(false); }} style={{cursor:'pointer'}}>
          <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </div>
        <div className="mobile-divider"></div>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-chart-pie"></i> Dashboard
            </Link>
            <button className="btn btn-primary btn-full" style={{marginTop:12}} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost btn-full" style={{marginBottom:8}} onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/register" className="btn btn-primary btn-full" onClick={() => setIsMenuOpen(false)}>Create Account</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;