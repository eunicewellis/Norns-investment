import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const stats = [
    { value: '2018', label: 'Founded' },
    { value: '1.2M+', label: 'Investors' },
    { value: '150+', label: 'Countries' },
    { value: '$12M+', label: 'Profits Paid' },
  ];

  const team = [
    { name: 'Alexander Chen', role: 'CEO & Founder', avatar: 'AC', bio: '15+ years in fintech and blockchain technology. Former VP at Goldman Sachs.' },
    { name: 'Sarah Mitchell', role: 'CTO', avatar: 'SM', bio: 'Expert in distributed systems and crypto mining infrastructure. PhD in Computer Science.' },
    { name: 'David Okafor', role: 'Head of Operations', avatar: 'DO', bio: 'Oversees global mining operations across 5 data centers worldwide.' },
    { name: 'Elena Rodriguez', role: 'Chief Compliance Officer', avatar: 'ER', bio: 'Ensures regulatory compliance across all jurisdictions we operate in.' },
  ];

  return (
    <div className="page">
      <div className="section-header" style={{textAlign:'center', marginBottom:'48px'}}>
        <div className="section-label"><i className="fas fa-info-circle"></i> About Us</div>
        <h1 className="section-title">Leading the Future of Crypto Mining</h1>
        <p className="section-subtitle">Norn Investments is a global investment platform serving investors worldwide since 2018. We combine cutting-edge technology with financial expertise.</p>
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
            At Norn Investments, we are democratizing access to cryptocurrency mining and investment opportunities. Our platform enables anyone, anywhere to earn daily profits through our state-of-the-art mining infrastructure.
          </p>
          <p style={{color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'24px'}}>
            With mining operations across three continents and an AI-powered trading system that operates 24/7, we deliver consistent returns that outperform traditional investment vehicles.
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

      <div className="section-header">
        <div className="section-label"><i className="fas fa-users"></i> Leadership Team</div>
        <h2 className="section-title">Meet Our Experts</h2>
      </div>
      <div className="grid-auto">
        {team.map((m, i) => (
          <div className="card card-hover" key={i} style={{textAlign:'center', padding:'32px 24px'}}>
            <div style={{
              width:'72px', height:'72px', borderRadius:'50%', margin:'0 auto 16px',
              background:'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'white', fontWeight:800, fontSize:'1.3rem'
            }}>{m.avatar}</div>
            <h3 style={{fontWeight:700, marginBottom:'4px'}}>{m.name}</h3>
            <div className="badge badge-primary" style={{marginBottom:'12px'}}>{m.role}</div>
            <p style={{color:'var(--text-secondary)', fontSize:'0.9rem', lineHeight:1.6}}>{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
