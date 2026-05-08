import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-text">
            <span className="navbar-logo-text">NORNS</span>
          </div>
          <p className="footer-desc">
            Premium cryptocurrency mining and investment platform powered by AI technology. Start earning daily profits with our cutting-edge infrastructure.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" title="Telegram" aria-label="Telegram">
              <i className="fab fa-telegram-plane"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/plans">Mining Plans</Link></li>
            <li><Link to="/markets">Market Data</Link></li>
            <li><Link to="/blog">Crypto News</Link></li>
            <li><Link to="/mobile-app">Mobile App</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/support">Help Center</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/kyc">KYC Verification</Link></li>
            <li><Link to="/referral">Referral Program</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Norn Investments. All rights reserved.</p>
        <div className="footer-badges">
          <span><i className="fas fa-lock"></i> 256-bit SSL</span>
          <span><i className="fas fa-bolt"></i> Instant Withdrawals</span>
          <span><i className="fas fa-globe"></i> Global Operations</span>
          <span><i className="fas fa-shield-alt"></i> DDoS Protected</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
