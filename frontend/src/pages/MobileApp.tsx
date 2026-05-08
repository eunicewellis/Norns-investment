import React from 'react';

const MobileApp: React.FC = () => {
  const features = [
    { icon: 'fa-chart-line', title: 'Live Portfolio Tracking', desc: 'Monitor your investments and earnings in real-time with interactive charts and analytics.' },
    { icon: 'fa-bolt', title: 'Instant Notifications', desc: 'Get push notifications for deposits, withdrawals, profit payouts, and market movements.' },
    { icon: 'fa-qrcode', title: 'QR Code Scanner', desc: 'Scan wallet addresses instantly for quick and error-free cryptocurrency deposits.' },
    { icon: 'fa-fingerprint', title: 'Biometric Security', desc: 'Secure your account with fingerprint or face ID login for added protection.' },
    { icon: 'fa-arrow-right-arrow-left', title: 'Quick Transactions', desc: 'Deposit, withdraw, and reinvest with just a few taps on your mobile device.' },
    { icon: 'fa-headset', title: 'In-App Support', desc: 'Access our support team directly from the app with live chat and ticket tracking.' },
  ];

  const reviews = [
    { name: 'Sarah K.', rating: 5, text: 'The mobile app is incredibly smooth. I can track my mining profits anywhere, anytime. Love the biometric login!' },
    { name: 'James T.', rating: 5, text: 'Best investment app I\'ve used. The real-time notifications keep me updated on every payout.' },
    { name: 'Maria L.', rating: 4, text: 'Great app with an intuitive interface. Quick deposits and withdrawals are a game-changer.' },
  ];

  return (
    <div className="page">
      {/* Hero Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
        <div>
          <div className="section-label" style={{ display: 'inline-flex' }}>
            <i className="fas fa-mobile-screen-button"></i> Mobile App
          </div>
          <h1 className="section-title" style={{ fontSize: '2.8rem', marginBottom: '16px' }}>
            Invest Anywhere,<br />
            <span style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Anytime
            </span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px', maxWidth: '480px' }}>
            Take control of your crypto investments on the go. Our mobile app gives you full access to your portfolio, 
            real-time profits, and instant transactions — all from your pocket.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => window.open('https://apps.apple.com', '_blank')}>
              <i className="fab fa-apple"></i> App Store
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => window.open('https://play.google.com', '_blank')}>
              <i className="fab fa-google-play"></i> Google Play
            </button>
          </div>

          <div style={{ display: 'flex', gap: '24px', marginTop: '28px' }}>
            <div>
              <div className="hero-stat-value" style={{ fontSize: '1.8rem' }}>50K+</div>
              <div className="hero-stat-label">Downloads</div>
            </div>
            <div>
              <div className="hero-stat-value" style={{ fontSize: '1.8rem' }}>4.8</div>
              <div className="hero-stat-label">App Store Rating</div>
            </div>
            <div>
              <div className="hero-stat-value" style={{ fontSize: '1.8rem' }}>4.7</div>
              <div className="hero-stat-label">Play Store Rating</div>
            </div>
          </div>
        </div>

        {/* Phone Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', perspective: '1000px' }}>
          <div className="phone-mockup">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="phone-app-content">
                <div className="phone-header">
                  <span className="phone-logo">NORNS</span>
                  <span className="phone-balance">$12,450.00</span>
                </div>
                <div className="phone-stats-row">
                  <div className="phone-stat"><span>Balance</span><strong>$12.4K</strong></div>
                  <div className="phone-stat"><span>Profit</span><strong style={{color:'#10b981'}}>+$1,230</strong></div>
                  <div className="phone-stat"><span>Active</span><strong>3 Plans</strong></div>
                </div>
                <div className="phone-action-grid">
                  <div className="phone-action"><span>📥</span> Deposit</div>
                  <div className="phone-action"><span>📤</span> Withdraw</div>
                  <div className="phone-action"><span>📊</span> Portfolio</div>
                  <div className="phone-action"><span>👥</span> Refer</div>
                </div>
                <div className="phone-recent">
                  <span className="phone-recent-label">Recent Profit</span>
                  <div className="phone-profit-item">
                    <span>Daily Mining Reward</span>
                    <span style={{color:'#10b981',fontWeight:600}}>+$45.20</span>
                  </div>
                  <div className="phone-profit-item">
                    <span>Referral Commission</span>
                    <span style={{color:'#10b981',fontWeight:600}}>+$12.50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ marginBottom: '64px' }}>
        <div className="section-header">
          <div className="section-label"><i className="fas fa-star"></i> App Features</div>
          <h2 className="section-title">Everything You Need, In Your Pocket</h2>
          <p className="section-subtitle">Our mobile app is packed with powerful features to help you manage your investments effortlessly.</p>
        </div>
        <div className="grid-3">
          {features.map((feat, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon"><i className={`fas ${feat.icon}`}></i></div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ marginBottom: '64px' }}>
        <div className="section-header">
          <div className="section-label"><i className="fas fa-comments"></i> User Reviews</div>
          <h2 className="section-title">What Our Users Say</h2>
        </div>
        <div className="grid-3">
          {reviews.map((review, i) => (
            <div className="card" key={i} style={{ padding: '28px' }}>
              <div style={{ color: 'var(--accent-warning)', marginBottom: '12px', fontSize: '0.9rem' }}>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px', fontStyle: 'italic', fontSize: '0.9rem' }}>
                "{review.text}"
              </p>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>— {review.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Download CTA */}
      <div className="cta-section" style={{ marginBottom: '40px' }}>
        <h2>Ready to Get Started?</h2>
        <p>Download the Norn Investments app today and start earning daily crypto profits from anywhere in the world.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', position: 'relative', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => window.open('https://apps.apple.com', '_blank')}>
              <i className="fab fa-apple"></i> Download for iOS
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => window.open('https://play.google.com', '_blank')}>
              <i className="fab fa-google-play"></i> Download for Android
            </button>
          </div>
        <div className="trust-bar" style={{ marginTop: '28px' }}>
          <span className="trust-badge"><i className="fas fa-check-circle"></i> Free to Download</span>
          <span className="trust-badge"><i className="fas fa-check-circle"></i> 100MB Size</span>
          <span className="trust-badge"><i className="fas fa-check-circle"></i> iOS 14+ / Android 8+</span>
          <span className="trust-badge"><i className="fas fa-check-circle"></i> Regular Updates</span>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;