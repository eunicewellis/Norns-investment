import React from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    smartsupp: any;
  }
}

const Deposit: React.FC = () => {
  const navigate = useNavigate();

  const openChat = () => {
    if (typeof window.smartsupp !== 'undefined') {
      window.smartsupp('chat:open');
    } else {
      window.open('https://www.smartsuppchat.com', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="page" style={{textAlign:'center'}}>
      <div className="section-header">
        <div className="section-label"><i className="fas fa-circle-dollar"></i> Deposit</div>
        <h1 className="section-title">Make a Deposit</h1>
        <p className="section-subtitle">To make a deposit, please contact our support team via live chat. We'll guide you through the process and help you fund your account.</p>
      </div>

      <div className="card" style={{maxWidth:'560px', margin:'0 auto', padding:'48px 32px'}}>
        <div style={{fontSize:'4rem', marginBottom:'24px'}}>&#x1F4AC;</div>
        <h2 style={{fontWeight:700, marginBottom:'12px'}}>Contact Support to Deposit</h2>
        <p style={{color:'var(--text-secondary)', marginBottom:'28px', lineHeight:1.7}}>
          Click the button below to open a live chat with our support team. 
          They will assist you with making a deposit and answer any questions you may have.
        </p>
        <div style={{display:'flex', flexDirection:'column', gap:'12px', maxWidth:'320px', margin:'0 auto'}}>
          <button 
            onClick={openChat}
            className="btn btn-primary btn-lg btn-full"
          >
            <i className="fas fa-comments"></i> Open Live Chat
          </button>
          <a 
            href="mailto:votearoos@gmail.com" 
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