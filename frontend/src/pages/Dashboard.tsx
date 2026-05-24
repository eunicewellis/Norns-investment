import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import API_BASE_URL from '../config';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [, setCompletedInvestments] = useState([]);
  const [cryptoPrices, setCryptoPrices] = useState([
    { name: 'Bitcoin', sym: 'BTC', icon: '₿', bg: '#f7931a', price: 67845.32, change: 2.45, volume: '$28.4B' },
    { name: 'Ethereum', sym: 'ETH', icon: '♦', bg: '#627eea', price: 3456.78, change: 3.12, volume: '$15.2B' },
    { name: 'Solana', sym: 'SOL', icon: '◎', bg: '#00ffa3', price: 142.50, change: 5.67, volume: '$3.8B' },
    { name: 'Cardano', sym: 'ADA', icon: '₳', bg: '#0033ad', price: 0.456, change: -1.23, volume: '$1.2B' },
    { name: 'XRP', sym: 'XRP', icon: '✕', bg: '#23292f', price: 0.623, change: 1.89, volume: '$2.1B' },
  ]);
  const [stats, setStats] = useState({
    totalProfit: 0,
    totalInvested: 0,
    activeCount: 0,
    completedCount: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      const data = await response.json();
      setUser(data);
      setActiveInvestments(data.activeInvestments);
      setCompletedInvestments(data.completedInvestments);

      const totalProfit = data.activeInvestments.reduce((sum: number, inv: any) => sum + (inv.totalReturn || 0), 0) +
                         data.completedInvestments.reduce((sum: number, inv: any) => sum + (inv.totalReturn || 0), 0);
      const totalInvested = data.activeInvestments.reduce((sum: number, inv: any) => sum + inv.amount, 0) +
                           data.completedInvestments.reduce((sum: number, inv: any) => sum + inv.amount, 0);

      setStats({
        totalProfit: totalProfit.toFixed(2),
        totalInvested: totalInvested.toFixed(2),
        activeCount: data.activeInvestments.length,
        completedCount: data.completedInvestments.length
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleChartData = [
    { month: 'Jan', profit: 2400 },
    { month: 'Feb', profit: 2800 },
    { month: 'Mar', profit: 3200 },
    { month: 'Apr', profit: 3600 },
    { month: 'May', profit: 4000 },
    { month: 'Jun', profit: 4400 },
    { month: 'Jul', profit: 4800 },
    { month: 'Aug', profit: 5200 },
    { month: 'Sep', profit: 5600 },
    { month: 'Oct', profit: 6000 },
    { month: 'Nov', profit: 6400 },
    { month: 'Dec', profit: 6800 }
  ];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.firstName}! <span role="img" aria-label="wave">👋</span></h1>
        <p>Your investment dashboard — track your portfolio and earnings</p>
      </div>

      {/* Market Prices - Displayed First */}
      <div className="dashboard-card" style={{marginBottom:'28px'}}>
        <div className="dashboard-card-header">
          <h3><i className="fas fa-chart-line" style={{color:'var(--accent-primary)', marginRight:8}}></i>Market Prices</h3>
          <Link to="/markets" style={{fontSize:'0.85rem',color:'var(--accent-primary)',fontWeight:600}}>View All <i className="fas fa-arrow-right"></i></Link>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {cryptoPrices.map((c, i) => (
                <tr key={i}>
                  <td className="coin-info">
                    <span className="coin-icon" style={{background:c.bg}}>{c.icon}</span>
                    <div><span className="coin-name">{c.name}</span><span className="coin-symbol">{c.sym}</span></div>
                  </td>
                  <td className={`price ${c.change >= 0 ? 'green' : 'red'}`}>${c.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td><span className={`change-badge ${c.change >= 0 ? 'up' : 'down'}`}>{c.change >= 0 ? '▲' : '▼'} {Math.abs(c.change).toFixed(2)}%</span></td>
                  <td>{c.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green"><i className="fas fa-wallet"></i></div>
          <div className="stat-content">
            <div className="stat-value">${user.balance.toLocaleString()}</div>
            <div className="stat-label">Available Balance</div>
            <div className="stat-change up"><i className="fas fa-arrow-up"></i> Updated live</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><i className="fas fa-chart-line"></i></div>
          <div className="stat-content">
            <div className="stat-value">${stats.totalProfit.toLocaleString()}</div>
            <div className="stat-label">Total Profit Earned</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><i className="fas fa-layer-group"></i></div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeCount}</div>
            <div className="stat-label">Active Investments</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><i className="fas fa-trophy"></i></div>
          <div className="stat-content">
            <div className="stat-value">{stats.completedCount}</div>
            <div className="stat-label">Completed Investments</div>
          </div>
        </div>
      </div>

      {/* Quick Actions + Portfolio Overview */}
      <div className="dashboard-quick-row" style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px'}}>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3><i className="fas fa-bolt" style={{color:'var(--accent-primary)', marginRight:8}}></i>Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            <button className="quick-action-btn" onClick={() => navigate('/deposit')}>
              <i className="fas fa-credit-card"></i>
              Make Deposit
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/withdrawal')}>
              <i className="fas fa-paper-plane"></i>
              Request Withdrawal
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/plans')}>
              <i className="fas fa-rocket"></i>
              New Investment
            </button>
            <button className="quick-action-btn" onClick={() => navigate('/portfolio')}>
              <i className="fas fa-chart-pie"></i>
              Portfolio
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h3><i className="fas fa-briefcase" style={{color:'var(--accent-primary)', marginRight:8}}></i>Portfolio Overview</h3>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
            <div className="detail-row">
              <span className="detail-label">Total Invested</span>
              <span className="detail-value" style={{color:'var(--accent-primary)'}}>${stats.totalInvested.toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Active ROI</span>
              <span className="detail-value" style={{color:'var(--accent-secondary)'}}>12.5%</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Portfolio Performance</span>
              <span className="detail-value" style={{color:'var(--accent-primary)'}}>+18.3% YTD</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Account Status</span>
              <span className="badge badge-primary"><i className="fas fa-check-circle"></i> Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="dashboard-card" style={{marginBottom:'28px'}}>
        <div className="dashboard-card-header">
          <h3><i className="fas fa-chart-area" style={{color:'var(--accent-primary)', marginRight:8}}></i>Monthly Performance</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" />
            <XAxis dataKey="month" stroke="var(--text-tertiary)" fontSize={12} />
            <YAxis stroke="var(--text-tertiary)" fontSize={12} />
            <Tooltip 
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-primary)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
            />
            <Line type="monotone" dataKey="profit" stroke="var(--accent-primary)" strokeWidth={2} dot={{fill:'var(--accent-primary)'}} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active Investments */}
      <div className="dashboard-card" style={{marginBottom:'28px'}}>
        <div className="dashboard-card-header">
          <h3><i className="fas fa-layer-group" style={{color:'var(--accent-primary)', marginRight:8}}></i>Active Investments</h3>
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
                <div className="detail-row">
                  <span className="detail-label">Investment</span>
                  <span className="detail-value">${investment.amount.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">ROI</span>
                  <span className="detail-value" style={{color:'var(--accent-primary)'}}>{investment.roiPercentage}%</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Maturity</span>
                  <span className="detail-value">{new Date(investment.maturityDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <div className="progress-text">75% Complete</div>
              </div>
            </div>
          ))}
          {activeInvestments.length === 0 && (
            <div style={{textAlign:'center', padding:'32px', color:'var(--text-tertiary)'}}>
              <i className="fas fa-inbox" style={{fontSize:'2rem',marginBottom:'12px',display:'block'}}></i>
              <p style={{marginBottom:'16px'}}>You don't have any active investments yet.</p>
              <Link to="/plans" className="btn btn-primary">Start Investing</Link>
            </div>
          )}
        </div>
      </div>

      {/* Live Recent Activity */}
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3><i className="fas fa-clock-rotate" style={{color:'var(--accent-primary)', marginRight:8}}></i>Live Activity</h3>
        </div>
        <div>
          {recentActivity.length > 0 ? recentActivity.map((act, i) => (
            <div className="activity-item" key={i}>
              <div className={`activity-dot ${act.color}`}></div>
              <div className="activity-content">
                <h4>{act.title}</h4>
                <p>{act.description}</p>
                <span className="activity-time">{act.time}</span>
              </div>
            </div>
          )) : (
            <>
              <div className="activity-item">
                <div className="activity-dot green"></div>
                <div className="activity-content">
                  <h4>Account Created</h4>
                  <p>Welcome to Binexelite! Start investing to see live activity.</p>
                  <span className="activity-time">Just now</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;