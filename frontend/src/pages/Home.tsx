import React from 'react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    smartsupp: any;
  }
}

const Home: React.FC = () => {
  const openChat = () => {
    if (typeof window.smartsupp !== 'undefined') {
      window.smartsupp('chat:open');
    } else {
      window.open('https://www.smartsupp.com', '_blank', 'noopener,noreferrer');
    }
  };

  const features = [
    { icon: 'fa-microchip', title: 'Instant Mining Payouts', desc: 'Daily profit distributions directly to your wallet. No waiting periods, no hidden fees.' },
    { icon: 'fa-robot', title: 'AI Trading Bots', desc: 'Our advanced algorithms execute profitable trades 24/7 across multiple cryptocurrency markets.' },
    { icon: 'fa-shield-halved', title: 'Bank-Grade Security', desc: '256-bit encryption, cold wallet storage, and multi-factor authentication protect your assets.' },
    { icon: 'fa-headset', title: '24/7 Expert Support', desc: 'Dedicated account managers and support team available around the clock via live chat.' },
    { icon: 'fa-chart-simple', title: 'Real-Time Analytics', desc: 'Comprehensive dashboard with live profit tracking, portfolio insights, and market data.' },
    { icon: 'fa-bolt', title: 'Lightning Withdrawals', desc: 'Instant withdrawal processing with no minimum limits. Access your earnings anytime.' }
  ];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-users"></i>
            Trusted by 2.4M+ Investors Worldwide
          </div>
          <h1>Invest in <span>Cryptocurrency Mining</span><br />& Earn Daily Profits</h1>
          <p>Advanced cryptocurrency mining and investment platform built to optimize digital asset generation through intelligent hash-power allocation, automated mining strategies, and real-time Bitcoin market analytics.</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              <i className="fas fa-rocket"></i> Start Earning Now
            </Link>
            <button onClick={openChat} className="btn btn-outline btn-lg">
              <i className="fas fa-comments"></i> Talk to Support
            </button>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section">
        <div className="section-header">
          <div className="section-label"><i className="fas fa-star"></i> Why Choose Us</div>
          <h2 className="section-title">The Most Advanced Mining Platform</h2>
          <p className="section-subtitle">We combine cutting-edge technology with financial expertise to deliver unmatched returns on your crypto investments.</p>
        </div>
        <div className="grid-auto">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon"><i className={`fas ${f.icon}`}></i></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <div className="section" style={{paddingBottom:0}}>
        <section className="cta-section">
          <h2>Start Earning Bitcoin Today</h2>
          <p>Join over 2.4 million investors already earning daily profits through our crypto mining platform. No experience required.</p>
          <button onClick={openChat} className="btn btn-primary btn-lg">
            <i className="fas fa-comments"></i> Talk to Our Team
          </button>
        </section>
      </div>

      {/* ===== TRUST BAR ===== */}
      <div className="trust-bar">
        <span className="trust-badge"><i className="fas fa-lock"></i> 256-bit Encryption</span>
        <span className="trust-badge"><i className="fas fa-globe"></i> Global Operations</span>
        <span className="trust-badge"><i className="fas fa-bolt"></i> Instant Withdrawals</span>
        <span className="trust-badge"><i className="fas fa-star"></i> 4.9/5 Rating</span>
        <span className="trust-badge"><i className="fas fa-building-columns"></i> Licensed & Regulated</span>
      </div>
    </div>
  );
};

export default Home;