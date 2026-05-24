import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    smartsupp: any;
  }
}

const Home: React.FC = () => {
  const [stats, setStats] = useState({ usersOnline: 0, totalInvested: 0, dailyProfit: 0, totalMembers: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        usersOnline: Math.floor(Math.random() * 5000) + 10000,
        totalInvested: Math.floor(Math.random() * 50000000) + 500000000,
        dailyProfit: Math.floor(Math.random() * 100000) + 500000,
        totalMembers: Math.floor(Math.random() * 10000) + 1248392
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openChat = () => {
    if (typeof window.smartsupp !== 'undefined') {
      window.smartsupp('chat:open');
    } else {
      window.open('https://www.smartsuppchat.com', '_blank', 'noopener,noreferrer');
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

  const [visibleFeed, setVisibleFeed] = useState([
    { name: 'John D.', country: '🇺🇸', action: 'invested', amount: '$2,500', time: '2 min ago' },
    { name: 'Amara O.', country: '🇳🇬', action: 'withdrew', amount: '$780', time: '5 min ago' },
    { name: 'Luis M.', country: '🇧🇷', action: 'deposited', amount: '$5,000', time: '8 min ago' }
  ]);

  useEffect(() => {
    const fi = setInterval(() => {
      const v = (Math.floor(Math.random()*9000)+1000).toLocaleString();
      setVisibleFeed(prev => [{
        name: ['Alex M.', 'Jane D.', 'Mike R.'][Math.floor(Math.random()*3)],
        country: ['🇺🇸', '🇳🇬', '🇧🇷'][Math.floor(Math.random()*3)],
        action: ['invested', 'withdrew', 'deposited'][Math.floor(Math.random()*3)],
        amount: '$' + v,
        time: 'Just now'
      }, ...prev].slice(0, 3));
    }, 8000);
    return () => clearInterval(fi);
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <i className="fas fa-users"></i>
            Trusted by 50K+ Investors Worldwide
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

      {/* ===== LIVE FEED ===== */}
      <section className="live-feed">
        <div className="live-card">
          <div className="live-header">
            <span className="live-dot"></span>
            Live Activity
          </div>
          {visibleFeed.map((item, idx) => (
            <div className="live-item" key={idx}>
              <span>{item.country}</span>
              <span className="live-name">{item.name}</span>
              <span className="live-action">{item.action}</span>
              <span className="live-amount">{item.amount}</span>
              <span className="live-time">{item.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="section" style={{paddingTop:0}}>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon green"><i className="fas fa-users"></i></div>
            <div className="stat-content">
              <div className="stat-value">{stats.usersOnline.toLocaleString()}</div>
              <div className="stat-label">Investors Online</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><i className="fas fa-sack-dollar"></i></div>
            <div className="stat-content">
              <div className="stat-value">${stats.totalInvested.toLocaleString()}</div>
              <div className="stat-label">Total Invested</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber"><i className="fas fa-coins"></i></div>
            <div className="stat-content">
              <div className="stat-value">${stats.dailyProfit.toLocaleString()}</div>
              <div className="stat-label">Daily Mining Profits</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><i className="fas fa-globe"></i></div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalMembers.toLocaleString()}</div>
              <div className="stat-label">Total Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== START MINING ===== */}
      <section className="section">
        <div className="section-header">
          <div className="section-label"><i className="fas fa-rocket"></i> Start Mining</div>
          <h2 className="section-title">Begin Your Crypto Mining Journey</h2>
          <p className="section-subtitle">Our team will help you set up your mining operation and start earning daily Bitcoin profits with our state-of-the-art infrastructure.</p>
        </div>
        <div className="card" style={{maxWidth:'700px', margin:'0 auto', padding:'48px 36px', textAlign:'center'}}>
          <div style={{fontSize:'4rem', marginBottom:'20px'}}>⚡</div>
          <h3 style={{fontWeight:700, fontSize:'1.5rem', marginBottom:'16px'}}>Ready to Start Mining?</h3>
          <p style={{color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'28px', maxWidth:'500px', margin:'0 auto 28px'}}>
            Contact our support team to get started with cryptocurrency mining. We'll help you choose the right plan, set up your account, and begin earning daily profits. Our experts are available 24/7 to guide you through every step.
          </p>
          <div style={{display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap'}}>
            <button onClick={openChat} className="btn btn-primary btn-lg">
              <i className="fas fa-comments"></i> Contact Support to Start
            </button>
            <Link to="/register" className="btn btn-outline btn-lg">
              <i className="fas fa-user-plus"></i> Create Account
            </Link>
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
          <p>Join over 50,000 investors already earning daily profits through our crypto mining platform. No experience required.</p>
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