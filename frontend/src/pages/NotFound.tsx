import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="not-found-404">404</div>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved to a new location.</p>

        <div className="not-found-suggestions">
          <h3>Here are some helpful links:</h3>
          <div className="not-found-links">
            <Link to="/" className="btn btn-primary btn-lg">
              <i className="fas fa-home"></i> Go Home
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg">
              <i className="fas fa-info-circle"></i> About Us
            </Link>
            <Link to="/plans" className="btn btn-outline btn-lg">
              <i className="fas fa-layer-group"></i> Our Plans
            </Link>
            <Link to="/support" className="btn btn-outline btn-lg">
              <i className="fas fa-headset"></i> Contact Support
            </Link>
          </div>
        </div>

        <p className="not-found-redirect">
          Redirecting to homepage in <strong>{countdown}</strong> seconds...
        </p>

        <div className="progress-bar" style={{ maxWidth: '300px', margin: '0 auto', height: '4px' }}>
          <div className="progress-fill" style={{ width: `${(10 - countdown) * 10}%`, transition: 'width 1s linear' }}></div>
        </div>

        <div className="not-found-fun">
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '32px' }}>
            <i className="fas fa-lightbulb" style={{ color: 'var(--accent-warning)', marginRight: 8 }}></i>
            Did you know? Norn Investments has paid over <strong>$12M</strong> in profits to our investors!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;