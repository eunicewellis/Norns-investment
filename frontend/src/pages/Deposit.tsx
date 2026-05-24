import React from 'react';
import { useNavigate } from 'react-router-dom';

const Deposit: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page" style={{textAlign:'center'}}>
      <div className="section-header">
        <div className="section-label"><i className="fas fa-circle-dollar"></i> Deposit</div>
        <h1 className="section-title">Make a Deposit</h1>
        <p className="section-subtitle">To make a deposit, please contact our support team. We'll guide you through the process and help you fund your account.</p>
      </div>

      <div className="card" style={{maxWidth:'560px', margin:'0 auto', padding:'48px 32px'}}>
        <div style={{fontSize:'4rem', marginBottom:'24px'}}>📞</div>
        <h2 style={{fontWeight:700, marginBottom:'12px'}}>Contact Support for Deposits</h2>
        <p style={{color:'var(--text-secondary)', marginBottom:'28px', lineHeight:1.7}}>
          Our support team will assist you with making a deposit. We accept various payment methods 
          and will help you choose the best option for your region.
        </p>
        <div style={{display:'flex', flexDirection:'column', gap:'12px', maxWidth:'320px', margin:'0 auto'}}>
          <a 
            href="https://www.smartsupp.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-lg btn-full"
          >
            <i className="fas fa-comments"></i> Live Chat
          </a>
          <a 
            href="mailto:support@binexelite.com" 
            className="btn btn-outline btn-lg btn-full"
          >
            <i className="fas fa-envelope"></i> Email Support
          </a>
          <button 
            className="btn btn-ghost btn-lg btn-full"
            onClick={() => navigate('/dashboard')}
          >
            <i className="fas fa-arrow-left"></i> Back to Dashboard
          </button>
        </div>
      </div>

      <div className="trust-bar" style={{marginTop:'40px'}}>
        <span className="trust-badge"><i className="fas fa-lock"></i> Secure Transactions</span>
        <span className="trust-badge"><i className="fas fa-headset"></i> 24/7 Support</span>
        <span className="trust-badge"><i className="fas fa-bolt"></i> Fast Processing</span>
      </div>
    </div>
  );
};

export default Deposit;