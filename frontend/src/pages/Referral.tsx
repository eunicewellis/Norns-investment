import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Referral: React.FC = () => {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referrals, setReferrals] = useState<any[]>([]);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarned: 0,
    pendingCommissions: 0,
  });
  const [copySuccess, setCopySuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const commissionRates = [
    { level: 'Level 1', rate: '10%', description: 'Direct referrals earn 10% commission on their deposits' },
    { level: 'Level 2', rate: '3%', description: 'Secondary referrals earn 3% commission' },
    { level: 'Level 3', rate: '1%', description: 'Tertiary referrals earn 1% commission' },
  ];

  const topReferrers = [
    { name: 'CryptoKing42', referrals: 47, earned: '$12,450' },
    { name: 'BTCWhale', referrals: 35, earned: '$9,230' },
    { name: 'InvestPro', referrals: 28, earned: '$7,890' },
    { name: 'MiningExpert', referrals: 22, earned: '$5,670' },
    { name: 'DiamondHands', referrals: 19, earned: '$4,320' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchReferralData();
    } else {
      // Generate a demo code for non-logged-in users
      const demoCode = 'NORNS' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setReferralCode(demoCode);
      setReferralLink(`${window.location.origin}/register?ref=${demoCode}`);
    }
  }, []);

  const fetchReferralData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/referral/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReferralCode(data.code);
        setReferralLink(`${window.location.origin}/register?ref=${data.code}`);
        setReferralStats(data.stats);
        setReferrals(data.referrals || []);
      } else {
        // Fallback demo data
        const demoCode = 'NORNS' + Math.random().toString(36).substring(2, 8).toUpperCase();
        setReferralCode(demoCode);
        setReferralLink(`${window.location.origin}/register?ref=${demoCode}`);
      }
    } catch (err) {
      console.error('Error fetching referral data:', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopySuccess('Code copied!');
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`🚀 Start earning daily crypto profits with Norn Investments! Use my referral code ${referralCode} and get a bonus!`)}&url=${encodeURIComponent(referralLink)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join Norn Investments and start earning daily Bitcoin profits!')}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`Join Norn Investments and start earning daily crypto profits! Use my referral code ${referralCode}: ${referralLink}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="page">
      <div className="section-header">
        <div className="section-label"><i className="fas fa-gift"></i> Referral Program</div>
        <h1 className="section-title">Earn with Referrals</h1>
        <p className="section-subtitle">Share your referral link and earn up to 10% commission on every deposit made by your referrals. Unlimited earning potential!</p>
      </div>

      {/* Dashboard Stats */}
      {isLoggedIn && (
        <div className="stats-grid" style={{ marginBottom: '40px' }}>
          <div className="stat-card">
            <div className="stat-icon green"><i className="fas fa-users"></i></div>
            <div className="stat-content">
              <div className="stat-value">{referralStats.totalReferrals}</div>
              <div className="stat-label">Total Referrals</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue"><i className="fas fa-user-check"></i></div>
            <div className="stat-content">
              <div className="stat-value">{referralStats.activeReferrals}</div>
              <div className="stat-label">Active Referrals</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber"><i className="fas fa-coins"></i></div>
            <div className="stat-content">
              <div className="stat-value">${referralStats.totalEarned.toLocaleString()}</div>
              <div className="stat-label">Total Earned</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple"><i className="fas fa-clock"></i></div>
            <div className="stat-content">
              <div className="stat-value">${referralStats.pendingCommissions.toLocaleString()}</div>
              <div className="stat-label">Pending Commissions</div>
            </div>
          </div>
        </div>
      )}

      {/* Referral Link / Code */}
      <div className="card" style={{ padding: '32px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <i className="fas fa-link" style={{ fontSize: '1.5rem', color: 'var(--accent-primary)' }}></i>
          <h3 style={{ fontWeight: 700 }}>Your Referral Link</h3>
        </div>

        <div className="referral-link-box">
          <div className="referral-url-field">
            <span className="referral-url-text">{referralLink}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={handleCopyLink}>
              <i className="fas fa-copy"></i> {copySuccess === 'Link copied!' ? 'Copied!' : 'Copy Link'}
            </button>
            <button className="btn btn-outline" onClick={handleCopyCode}>
              <i className="fas fa-tag"></i> Copy Code: {referralCode}
            </button>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '12px' }}>Share on social media:</p>
          <div className="referral-share-buttons">
            <button className="share-btn twitter" onClick={() => handleShare('twitter')}>
              <i className="fab fa-twitter"></i> Twitter
            </button>
            <button className="share-btn telegram" onClick={() => handleShare('telegram')}>
              <i className="fab fa-telegram-plane"></i> Telegram
            </button>
            <button className="share-btn whatsapp" onClick={() => handleShare('whatsapp')}>
              <i className="fab fa-whatsapp"></i> WhatsApp
            </button>
            <button className="share-btn facebook" onClick={() => handleShare('facebook')}>
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div className="section-label"><i className="fas fa-info-circle"></i> How It Works</div>
        <h2 className="section-title">Multi-Level Commission Structure</h2>
      </div>

      <div className="grid-3" style={{ marginBottom: '48px' }}>
        <div className="feature-card" style={{ textAlign: 'center' }}>
          <div className="feature-icon" style={{ margin: '0 auto 16px', background: 'var(--accent-primary-light)' }}>
            <i className="fas fa-share-nodes"></i>
          </div>
          <h3>1. Share Your Link</h3>
          <p>Share your unique referral link with friends and family via social media, email, or messaging apps.</p>
        </div>
        <div className="feature-card" style={{ textAlign: 'center' }}>
          <div className="feature-icon" style={{ margin: '0 auto 16px', background: 'var(--accent-secondary-light)' }}>
            <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>2.</span>
          </div>
          <h3>2. They Join & Invest</h3>
          <p>Your referrals sign up using your link and make their first deposit on our platform.</p>
        </div>
        <div className="feature-card" style={{ textAlign: 'center' }}>
          <div className="feature-icon" style={{ margin: '0 auto 16px', background: 'var(--accent-warning-light)' }}>
            <i className="fas fa-coins"></i>
          </div>
          <h3>3. You Earn Commissions</h3>
          <p>You earn a percentage of every deposit they make. Commissions are credited instantly to your account.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
        {/* Commission Rates */}
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>
            <i className="fas fa-percent" style={{ color: 'var(--accent-primary)', marginRight: 8 }}></i>
            Commission Rates
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {commissionRates.map((rate, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: 'var(--radius-sm)',
                  background: i === 0 ? 'var(--accent-primary-light)' : i === 1 ? 'var(--accent-secondary-light)' : 'var(--accent-warning-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '1rem',
                  color: i === 0 ? 'var(--accent-primary)' : i === 1 ? 'var(--accent-secondary)' : 'var(--accent-warning)',
                  flexShrink: 0
                }}>
                  L{i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 700, fontSize: '0.9rem' }}>{rate.level} — <span style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{rate.rate}</span></h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{rate.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>
            <i className="fas fa-trophy" style={{ color: 'var(--accent-warning)', marginRight: 8 }}></i>
            Top Referrers
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topReferrers.map((referrer, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: i === 0 ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                              i === 1 ? 'linear-gradient(135deg, #94a3b8, #64748b)' :
                              i === 2 ? 'linear-gradient(135deg, #b45309, #92400e)' :
                              'var(--bg-elevated)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.8rem', color: 'white', flexShrink: 0
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{referrer.name}</div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{referrer.referrals} referrals</div>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>{referrer.earned}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      {!isLoggedIn && (
        <div className="cta-section">
          <h2>Ready to Start Earning?</h2>
          <p>Create an account and get your unique referral link to start earning commissions today.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', position: 'relative' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
              <i className="fas fa-rocket"></i> Create Free Account
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/login')}>
              <i className="fas fa-sign-in-alt"></i> Login
            </button>
          </div>
        </div>
      )}

      {/* Referral List */}
      {isLoggedIn && referrals.length > 0 && (
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>
            <i className="fas fa-list" style={{ color: 'var(--accent-primary)', marginRight: 8 }}></i>
            Your Referrals ({referrals.length})
          </h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Joined</th>
                  <th>Deposit Amount</th>
                  <th>Commission Earned</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((ref, i) => (
                  <tr key={i}>
                    <td>{ref.name}</td>
                    <td>{new Date(ref.dateJoined).toLocaleDateString()}</td>
                    <td>${ref.depositAmount.toLocaleString()}</td>
                    <td className="price-up">+${ref.commission.toLocaleString()}</td>
                    <td><span className={`tx-status ${ref.status === 'active' ? 'active' : ref.status === 'pending' ? 'pending' : 'completed'}`}>{ref.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Terms */}
      <p style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '32px' }}>
        Referral commissions are paid on qualifying deposits only. We reserve the right to modify or terminate the referral program at any time. 
        Fraudulent activity will result in forfeiture of commissions and account suspension.
      </p>
    </div>
  );
};

export default Referral;