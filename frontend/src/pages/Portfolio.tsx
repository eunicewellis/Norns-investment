import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Portfolio: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [completedInvestments, setCompletedInvestments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/profile', {
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
    } catch (error) {
      setError('Error fetching portfolio data. Please try again.');
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="portfolio">
      <div className="page-header">
        <h1>My Portfolio</h1>
        <p>Track all your investments and earnings in one place</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Portfolio Stats */}
      <div className="portfolio-stats">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">${user.balance.toLocaleString()}</div>
          <div className="stat-label">Total Balance</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-value">${user.totalProfit.toLocaleString()}</div>
          <div className="stat-label">Total Profit</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{activeInvestments.length}</div>
          <div className="stat-label">Active Investments</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{completedInvestments.length}</div>
          <div className="stat-label">Completed Investments</div>
        </div>
      </div>

      {/* Active Investments */}
      <div className="active-investments">
        <div className="section-header">
          <h3>Active Investments</h3>
          <span className="section-subtitle">Investments currently earning returns</span>
        </div>
        <div className="investments-grid">
          {activeInvestments.map((investment: any) => (
            <div className="investment-card" key={investment.id}>
              <div className="investment-header">
                <h4>{investment.planType} Plan</h4>
                <span className="investment-status active">Active</span>
              </div>
              <div className="investment-details">
                <div className="detail-item">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">${investment.amount.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ROI:</span>
                  <span className="detail-value">{investment.roiPercentage}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Maturity:</span>
                  <span className="detail-value">{new Date(investment.maturityDate).toLocaleDateString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Daily Profit:</span>
                  <span className="detail-value">${((investment.amount * investment.roiPercentage / 100 / 30)).toFixed(2)}</span>
                </div>
              </div>
              <div className="investment-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${((new Date().getTime() - new Date(investment.startDate).getTime()) / 
                                (new Date(investment.maturityDate).getTime() - new Date(investment.startDate).getTime())) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  {((new Date().getTime() - new Date(investment.startDate).getTime()) / 
                    (new Date(investment.maturityDate).getTime() - new Date(investment.startDate).getTime())) * 100}%
                  Complete
                </span>
              </div>
            </div>
          ))}
          {activeInvestments.length === 0 && (
            <div className="no-investments">
              <p>You don't have any active investments yet.</p>
              <Link to="/plans" className="btn btn-primary">Start Investing</Link>
            </div>
          )}
        </div>
      </div>

      {/* Completed Investments */}
      <div className="completed-investments">
        <div className="section-header">
          <h3>Completed Investments</h3>
          <span className="section-subtitle">Investments that have reached maturity</span>
        </div>
        <div className="investments-grid">
          {completedInvestments.map((investment: any) => (
            <div className="investment-card completed" key={investment.id}>
              <div className="investment-header">
                <h4>{investment.planType} Plan</h4>
                <span className="investment-status completed">Completed</span>
              </div>
              <div className="investment-details">
                <div className="detail-item">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">${investment.amount.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ROI:</span>
                  <span className="detail-value">{investment.roiPercentage}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Return:</span>
                  <span className="detail-value">${investment.totalReturn.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Profit:</span>
                  <span className="detail-value">+${(investment.totalReturn - investment.amount).toLocaleString()}</span>
                </div>
              </div>
              <div className="investment-actions">
                <button className="btn btn-outline">View Details</button>
              </div>
            </div>
          ))}
          {completedInvestments.length === 0 && (
            <div className="no-investments">
              <p>You don't have any completed investments yet.</p>
              <Link to="/plans" className="btn btn-primary">Start Investing</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;