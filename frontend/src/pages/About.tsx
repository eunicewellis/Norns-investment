import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const stats = [
    { value: '2020', label: 'Founded' },
    { value: '2.4M+', label: 'Investors' },
    { value: '120+', label: 'Countries' },
    { value: '$8.5M+', label: 'Profits Paid' },
  ];

  return (
    <div className="page">
      <div className="section-header" style={{textAlign:'center', marginBottom:'48px'}}>
        <div className="section-label"><i className="fas fa-info-circle"></i> About Us</div>
        <h1 className="section-title">Leading the Future of Crypto Mining</h1>
        <p className="section-subtitle">Binexelite is a global investment platform serving investors worldwide since 2020. We combine cutting-edge technology with financial expertise to optimize digital asset generation.</p>
      </div>

      <div className="stats-grid" style={{marginBottom:'48px'}}>
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon green"><i className="fas fa-chart-line"></i></div>
            <div className="stat-content" style={{textAlign:'center'}}>
              <div className="stat-value" style={{fontSize:'2rem'}}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{marginBottom:'48px', alignItems:'center'}}>
        <div>
          <h2 style={{fontSize:'1.8rem', fontWeight:700, marginBottom:'16px'}}>Our Mission</h2>
          <p style={{color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'16px'}}>
            At Binexelite, we are democratizing access to cryptocurrency mining and investment opportunities. Our platform enables anyone, anywhere to earn daily profits through our state-of-the-art mining infrastructure.
          </p>
          <p style={{color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'24px'}}>
            With mining operations across three continents and an AI-powered trading system that operates 24/7, we deliver consistent returns through intelligent hash-power allocation and automated mining strategies.
          </p>
          <Link to="/register" className="btn btn-primary"><i className="fas fa-rocket"></i> Start Investing</Link>
        </div>
        <div className="card" style={{padding:'40px', textAlign:'center', background:'var(--bg-elevated)'}}>
          <i className="fas fa-hard-drive" style={{fontSize:'4rem', color:'var(--accent-primary)', marginBottom:'20px'}}></i>
          <h3 style={{fontWeight:700, marginBottom:'12px'}}>10,000+ BTC Mined</h3>
          <p style={{color:'var(--text-secondary)'}}>Our mining rigs operate at peak efficiency 24/7/365, generating consistent returns for our investors.</p>
        </div>
      </div>

      <div className="section-header">
        <div className="section-label"><i className="fas fa-star"></i> Our Values</div>
        <h2 className="section-title">What We Stand For</h2>
      </div>
      <div className="grid-auto" style={{marginBottom:'48px'}}>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-shield-halved"></i></div>
          <h3>Security First</h3>
          <p>Bank-grade encryption, cold storage, and multi-factor authentication protect every asset on our platform.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-eye"></i></div>
          <h3>Transparency</h3>
          <p>Real-time reporting, verifiable mining operations, and clear fee structures with no hidden costs.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon"><i className="fas fa-handshake"></i></div>
          <h3>Trust and Integrity</h3>
          <p>Licensed and regulated, with a proven track record of timely payouts and exceptional customer service.</p>
        </div>
      </div>
    </div>
  );
};

export default About;