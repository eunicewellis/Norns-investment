import React from 'react';

declare global {
  interface Window {
    Tawk_API: any;
  }
}

const Support: React.FC = () => {
  const openChat = () => {
    if (typeof window.Tawk_API !== 'undefined') {
      window.Tawk_API.maximize();
    } else {
      window.open('https://www.tawk.to', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="page">
      <div className="section-header">
        <div className="section-label"><i className="fas fa-headset"></i> Support Center</div>
        <h1 className="section-title">How Can We Help You?</h1>
        <p className="section-subtitle">Our dedicated support team is here to assist you with any questions or issues.</p>
      </div>

      {/* Main Live Chat Card */}
      <div className="card" style={{maxWidth: '680px', margin: '0 auto 48px', padding: '48px 32px', textAlign: 'center'}}>
        <div style={{fontSize: '4rem', marginBottom: '20px'}}>&#x1F4AC;</div>
        <h2 style={{fontWeight: 700, marginBottom: '12px'}}>Chat with Our Support Team</h2>
        <p style={{color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.7}}>
          Get instant help from our support team via live chat. We're available 24/7 to assist you 
          with deposits, withdrawals, investments, and any other questions you may have.
        </p>
        <button className="btn btn-primary btn-lg" onClick={openChat}>
          <i className="fas fa-comments"></i> Start Live Chat
        </button>
      </div>

      {/* Quick Contact Methods */}
      <div className="grid-3" style={{ marginBottom: '48px', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
        <a href="mailto:votearoos@gmail.com" className="card card-hover" style={{ textAlign: 'center', padding: '32px 20px', textDecoration: 'none' }}>
          <div className="feature-icon" style={{ margin: '0 auto 16px' }}>
            <i className="fas fa-envelope"></i>
          </div>
          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Email Support</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>Get a response within 24 hours</p>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>votearoos@gmail.com</span>
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="card card-hover" style={{ textAlign: 'center', padding: '32px 20px', textDecoration: 'none' }}>
          <div className="feature-icon" style={{ margin: '0 auto 16px' }}>
            <i className="fab fa-telegram-plane"></i>
          </div>
          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Telegram</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>Join our community group</p>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>@BinexeliteSupport</span>
        </a>
        <button onClick={openChat} className="card card-hover" style={{ textAlign: 'center', padding: '32px 20px', textDecoration: 'none', cursor: 'pointer', border: '1px solid var(--border-primary)', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', width: '100%' }}>
          <div className="feature-icon" style={{ margin: '0 auto 16px' }}>
            <i className="fas fa-comments"></i>
          </div>
          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Live Chat</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>Chat with our support team</p>
          <span style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Start Live Chat</span>
        </button>
      </div>

      {/* Support Hours */}
      <div className="cta-section" style={{ marginTop: '64px' }}>
        <h2><i className="fas fa-clock"></i> Support Hours</h2>
        <p>Our team is available 24/7 for urgent issues. Standard support is available Monday through Friday, 9 AM - 6 PM EST.</p>
        <div className="trust-bar">
          <span className="trust-badge"><i className="fas fa-check-circle"></i> 24/7 Live Chat</span>
          <span className="trust-badge"><i className="fas fa-check-circle"></i> Average 2hr Response</span>
          <span className="trust-badge"><i className="fas fa-check-circle"></i> 98% Satisfaction Rate</span>
          <span className="trust-badge"><i className="fas fa-check-circle"></i> Multilingual Team</span>
        </div>
      </div>
    </div>
  );
};

export default Support;