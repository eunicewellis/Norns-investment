import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API_BASE_URL from '../config';
import { getStoredCurrency, countries, getCurrencyForCountry, fetchExchangeRates, convertPrice } from '../utils/currency';

declare global {
  interface Window { Tawk_API: any; }
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [, setCompletedInvestments] = useState([]);
  const [kycVerified, setKycVerified] = useState(false);
  const [cryptoPrices, setCryptoPrices] = useState<any[]>([]);
  const [currency, setCurrency] = useState(getStoredCurrency());
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [stats, setStats] = useState({
    totalProfit: 0,
    totalInvested: 0,
    totalWithdrawn: 0,
    activeCount: 0,
    completedCount: 0,
    balance: 0
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Show toast from navigation state (e.g. after withdrawal)
  useEffect(() => {
    if (location.state && (location.state as any).withdrawalSuccess) {
      setToastMsg((location.state as any).withdrawalSuccess);
      // Clear the state so it doesn't show again on re-render
      window.history.replaceState({}, document.title);
      // Auto-dismiss after 4 seconds
      const timer = setTimeout(() => setToastMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // Detect admin-only token and redirect
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.admin && !payload.userId) {
        localStorage.removeItem('token');
        localStorage.removeItem('admin_authenticated');
        navigate('/login');
        return;
      }
    } catch (e) {}
    fetchUserData();
    fetchCryptoPrices();
    checkKycStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const changeCurrency = (country: string) => {
    const c = getCurrencyForCountry(country);
    localStorage.setItem('binexelite_currency', JSON.stringify(c));
    localStorage.setItem('binexelite_country', country);
    setCurrency(c);
    setShowCurrencyPicker(false);
    fetchExchangeRates().then(() => fetchCryptoPrices(c.code, c.symbol));
  };

  const csym = () => currency.symbol;

  // Convert USD amount to selected currency using exchange rates
  const cval = (usdAmt: number) => convertPrice(usdAmt, currency.code);

  const checkKycStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/kyc/status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setKycVerified(data.kycVerified === true);
      }
    } catch (e) {
      console.error('Error checking KYC status:', e);
    }
  };

  const fetchCryptoPrices = async (curCode?: string, curSym?: string) => {
    const targetCode = curCode || currency.code;
    const targetSym = curSym || currency.symbol;
    try {
      await fetchExchangeRates();
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true');
      if (res.ok) {
        const data = await res.json();
        const prices = [
          { name: 'Bitcoin', sym: 'BTC', icon: '₿', bg: '#f7931a', price: convertPrice(data.bitcoin.usd, targetCode), change: Math.abs(data.bitcoin.usd_24h_change || 0), volume: targetSym + (data.bitcoin.usd_24h_vol / 1e9).toFixed(1) + 'B' },
          { name: 'Ethereum', sym: 'ETH', icon: '♦', bg: '#627eea', price: convertPrice(data.ethereum.usd, targetCode), change: data.ethereum.usd_24h_change || 0, volume: targetSym + (data.ethereum.usd_24h_vol / 1e9).toFixed(1) + 'B' },
          { name: 'Solana', sym: 'SOL', icon: '◎', bg: '#00ffa3', price: convertPrice(data.solana.usd, targetCode), change: data.solana.usd_24h_change || 0, volume: targetSym + (data.solana.usd_24h_vol / 1e9).toFixed(1) + 'B' },
          { name: 'Cardano', sym: 'ADA', icon: '₳', bg: '#0033ad', price: convertPrice(data.cardano.usd, targetCode), change: data.cardano.usd_24h_change || 0, volume: targetSym + (data.cardano.usd_24h_vol / 1e9).toFixed(1) + 'B' },
          { name: 'XRP', sym: 'XRP', icon: '✕', bg: '#23292f', price: convertPrice(data.ripple.usd, targetCode), change: data.ripple.usd_24h_change || 0, volume: targetSym + (data.ripple.usd_24h_vol / 1e9).toFixed(1) + 'B' },
        ];
        setCryptoPrices(prices);
      }
    } catch (e) {}
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }
      const data = await response.json();
      setUser(data);
      setActiveInvestments(data.activeInvestments);
      setCompletedInvestments(data.completedInvestments);
      const totalInvested = data.activeInvestments.reduce((sum: number, inv: any) => sum + inv.amount, 0) +
        data.completedInvestments.reduce((sum: number, inv: any) => sum + inv.amount, 0);
      setStats({
        totalProfit: data.totalProfit || 0,
        totalInvested: Number(totalInvested.toFixed(2)),
        totalWithdrawn: data.totalWithdrawn || 0,
        activeCount: data.activeInvestments.length,
        completedCount: data.completedInvestments.length,
        balance: data.balance || 0
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleChartData = [
    { month: 'Jan', profit: 2400 }, { month: 'Feb', profit: 2800 }, { month: 'Mar', profit: 3200 },
    { month: 'Apr', profit: 3600 }, { month: 'May', profit: 4000 }, { month: 'Jun', profit: 4400 },
    { month: 'Jul', profit: 4800 }, { month: 'Aug', profit: 5200 }, { month: 'Sep', profit: 5600 },
    { month: 'Oct', profit: 6000 }, { month: 'Nov', profit: 6400 }, { month: 'Dec', profit: 6800 }
  ];

  if (isLoading) {
    return (<div className="loading-container"><div className="loading-spinner"></div><p className="loading-text">Loading your dashboard...</p></div>);
  }
  if (!user) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <h1>Welcome back, {user.firstName}! <span role="img" aria-label="wave">👋</span></h1>
          <p>Your investment dashboard — track your portfolio and earnings</p>
        </div>
        <div style={{position:'relative'}}>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowCurrencyPicker(!showCurrencyPicker)}>
            <i className="fas fa-money-bill-wave"></i> {currency.symbol} {currency.code}
          </button>
          {showCurrencyPicker && (
            <div style={{position:'absolute', top:'100%', right:0, zIndex:100, maxHeight:'300px', overflowY:'auto', background:'var(--bg-card)', border:'1px solid var(--border-primary)', borderRadius:'var(--radius-md)', padding:'8px', minWidth:'200px'}}>
              {countries.map(c => {
                const cur = getCurrencyForCountry(c);
                return (
                  <button key={c} className={`mobile-link ${c === currency.code ? 'active' : ''}`}
                    style={{width:'100%', textAlign:'left', padding:'8px 12px', fontSize:'0.85rem'}}
                    onClick={() => changeCurrency(c)}
                  >{cur.symbol} {cur.code} - {c}</button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {toastMsg && (
        <div className="alert alert-success" style={{marginBottom:'20px', animation:'fadeIn 0.3s'}}>
          <i className="fas fa-check-circle"></i> {toastMsg}
        </div>
      )}

      {cryptoPrices.length > 0 && (
      <div className="dashboard-card" style={{marginBottom:'28px'}}>
        <div className="dashboard-card-header">
          <h3><i className="fas fa-chart-line" style={{color:'var(--accent-primary)', marginRight:8}}></i>Market Prices</h3>
          <Link to="/markets" style={{fontSize:'0.85rem',color:'var(--accent-primary)',fontWeight:600}}>View All <i className="fas fa-arrow-right"></i></Link>
        </div>
        <div className="table-container">
          <table className="table">
            <thead><tr><th>Name</th><th>Price</th><th>24h Change</th><th>Volume</th></tr></thead>
            <tbody>
              {cryptoPrices.map((c, i) => (
                <tr key={i}>
                  <td className="coin-info">
                    <span className="coin-icon" style={{background:c.bg}}>{c.icon}</span>
                    <div><span className="coin-name">{c.name}</span><span className="coin-symbol">{c.sym}</span></div>
                  </td>
                  <td className={`price ${c.change >= 0 ? 'green' : 'red'}`}>{csym()}{c.price?.toLocaleString(undefined, {minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                  <td><span className={`change-badge ${c.change >= 0 ? 'up' : 'down'}`}>{c.change >= 0 ? '▲' : '▼'} {Math.abs(c.change || 0).toFixed(2)}%</span></td>
                  <td>{c.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green"><i className="fas fa-wallet"></i></div>
          <div className="stat-content">
            <div className="stat-value">{csym()}{cval(user.balance).toLocaleString()}</div>
            <div className="stat-label">Available Balance</div>
            <div className="stat-change up"><i className="fas fa-arrow-up"></i> Updated live</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><i className="fas fa-chart-line"></i></div>
          <div className="stat-content">
            <div className="stat-value">{csym()}{cval(stats.totalProfit).toLocaleString()}</div>
            <div className="stat-label">Total Profit Earned</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><i className="fas fa-layer-group"></i></div>
          <div className="stat-content">
            <div className="stat-value">{csym()}{cval(stats.totalInvested).toLocaleString()}</div>
            <div className="stat-label">Active Investments</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><i className="fas fa-trophy"></i></div>
          <div className="stat-content">
            <div className="stat-value">{csym()}{cval(stats.totalWithdrawn).toLocaleString()}</div>
            <div className="stat-label">Amount Withdrawn</div>
          </div>
        </div>
      </div>

      {/* Quick Actions + Portfolio Overview */}
      <div className="dashboard-quick-row" style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px'}}>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3><i className="fas fa-bolt"></i>Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            <button className="quick-action-btn" onClick={() => navigate('/deposit')}><i className="fas fa-credit-card"></i> Make Deposit</button>
            <button className="quick-action-btn" onClick={() => navigate('/withdrawal')}><i className="fas fa-paper-plane"></i> Request Withdrawal</button>
            <button className="quick-action-btn" onClick={() => { if (typeof window.Tawk_API !== 'undefined') window.Tawk_API.maximize(); else window.open('https://www.tawk.to', '_blank'); }}><i className="fas fa-rocket"></i> New Investment</button>
            <button className="quick-action-btn" onClick={() => navigate('/portfolio')}><i className="fas fa-chart-pie"></i> Portfolio</button>
          </div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3><i className="fas fa-briefcase"></i>Portfolio Overview</h3>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <div className="detail-row"><span className="detail-label">Total Invested</span><span className="detail-value" style={{color:'var(--accent-primary)'}}>{csym()}{cval(stats.totalInvested).toLocaleString()}</span></div>
            <div className="detail-row"><span className="detail-label">Active ROI</span><span className="detail-value" style={{color:'var(--accent-secondary)'}}>12.5%</span></div>
            <div className="detail-row"><span className="detail-label">Portfolio Performance</span><span className="detail-value" style={{color:'var(--accent-primary)'}}>+18.3% YTD</span></div>
            <div className="detail-row">
              <span className="detail-label">Account Status</span>
              {kycVerified ? (
                <span className="badge badge-primary"><i className="fas fa-check-circle"></i> Verified</span>
              ) : (
                <Link to="/kyc" className="badge badge-warning" style={{cursor:'pointer', textDecoration:'none'}}><i className="fas fa-clock"></i> Unverified</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card" style={{marginBottom:'28px'}}>
        <div className="dashboard-card-header">
          <h3><i className="fas fa-chart-area"></i>Monthly Performance</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
            <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} />
            <YAxis stroke="var(--text-tertiary)" fontSize={12} />
            <Tooltip contentStyle={{background:'var(--bg-card)', border:'1px solid var(--border-primary)', borderRadius:'8px', color:'var(--text-primary)'}} />
            <Line type="monotone" dataKey="profit" stroke="var(--accent-primary)" strokeWidth={2} dot={{fill:'var(--accent-primary)'}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="dashboard-card" style={{marginBottom:'28px'}}>
        <div className="dashboard-card-header">
          <h3><i className="fas fa-layer-group"></i>Active Investments</h3>
          <Link to="/portfolio" style={{fontSize:'0.85rem',color:'var(--accent-primary)',fontWeight:600}}>View All <i className="fas fa-arrow-right"></i></Link>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'16px'}}>
          {activeInvestments.slice(0, 3).map((investment: any) => (
            <div className="investment-card" key={investment._id || investment.id}>
              <div className="investment-header">
                <h4>{investment.planType} Plan</h4>
                <span className="tx-status active"><i className="fas fa-circle"></i> Active</span>
              </div>
              <div className="investment-details">
                <div className="detail-row"><span className="detail-label">Investment</span><span className="detail-value">{csym()}{cval(investment.amount).toLocaleString()}</span></div>
                <div className="detail-row"><span className="detail-label">ROI</span><span className="detail-value" style={{color:'var(--accent-primary)'}}>{investment.roiPercentage}%</span></div>
                <div className="detail-row"><span className="detail-label">Maturity</span><span className="detail-value">{new Date(investment.maturityDate).toLocaleDateString()}</span></div>
              </div>
              <div className="progress-section">
                <div className="progress-bar"><div className="progress-fill" style={{width:'75%'}}></div></div>
                <div className="progress-text">75% Complete</div>
              </div>
            </div>
          ))}
          {activeInvestments.length === 0 && (
            <div style={{textAlign:'center', padding:'32px', color:'var(--text-tertiary)'}}>
              <i className="fas fa-inbox" style={{fontSize:'2rem',marginBottom:'12px',display:'block'}}></i>
              <p style={{marginBottom:'16px'}}>You don't have any active investments yet.</p>
              <button onClick={() => { if (typeof window.Tawk_API !== 'undefined') window.Tawk_API.maximize(); else window.open('https://www.tawk.to', '_blank'); }} className="btn btn-primary">Contact Support</button>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3><i className="fas fa-clock-rotate"></i>Live Activity</h3>
        </div>
        <div>
          {recentActivity.length > 0 ? recentActivity.map((act, i) => (
            <div className="activity-item" key={i}>
              <div className={`activity-dot ${act.color}`}></div>
              <div className="activity-content"><h4>{act.title}</h4><p>{act.description}</p><span className="activity-time">{act.time}</span></div>
            </div>
          )) : (
            <div className="activity-item">
              <div className="activity-dot green"></div>
              <div className="activity-content"><h4>Account Created</h4><p>Welcome to Binexelite! Start investing to see live activity.</p><span className="activity-time">Just now</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;