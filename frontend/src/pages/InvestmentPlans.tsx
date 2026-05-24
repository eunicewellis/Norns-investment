import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

interface Plan {
  id: string;
  type: string;
  icon: string;
  color: string;
  roi: number;
  lockupPeriod: number;
  minAmount: number;
  maxAmount: number;
  description: string;
  features: string[];
  badge: string | null;
}

const InvestmentPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isInvesting, setIsInvesting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/investments/plans`);
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();
  }, []);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setAmount(plan.minAmount.toString());
    setError('');
    setSuccess('');
  };

  const handleInvest = async () => {
    if (!selectedPlan) return;
    if (!amount || parseFloat(amount) < selectedPlan.minAmount) {
      setError(`Minimum amount for ${selectedPlan.type} is $${selectedPlan.minAmount}`);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setIsInvesting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/investments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ planType: selectedPlan.type, amount: parseFloat(amount) })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message);
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsInvesting(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Crypto Mining Plans</h1>
      <p className="page-subtitle">Choose your investment plan and start earning daily Bitcoin profits with our advanced mining infrastructure</p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="plans-grid">
        {plans.map((plan) => (
          <div 
            className={`plan-card ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
            key={plan.id}
          >
            {plan.badge && <div className="plan-badge">{plan.badge}</div>}
            <div className="plan-icon-wrapper" style={{ background: plan.color }}>
              <span>{plan.icon}</span>
            </div>
            <h3 className="plan-name">{plan.type}</h3>
            <div className="plan-roi">
              <span className="roi-percentage">{plan.roi}%</span>
              <span className="roi-label">ROI in {plan.lockupPeriod} Days</span>
            </div>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-limits">
              <span>Min: ${plan.minAmount.toLocaleString()}</span>
              <span>Max: ${plan.maxAmount.toLocaleString()}</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>
            <button 
              className={`btn ${plan.badge === 'Most Popular' ? 'btn-gold' : plan.badge === 'Ultimate' ? 'btn-primary' : 'btn-outline'} btn-full`}
              onClick={() => handlePlanSelect(plan)}
            >
              {selectedPlan?.id === plan.id ? 'Selected ✓' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Investment Form */}
      {selectedPlan && (
        <div className="investment-form-container">
          <div className="investment-form-card">
            <h2>Invest in {selectedPlan.type}</h2>
            <div className="form-group">
              <label>Investment Amount (USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Min: $${selectedPlan.minAmount}`}
                min={selectedPlan.minAmount}
              />
              <small>Minimum: ${selectedPlan.minAmount.toLocaleString()} | Maximum: ${selectedPlan.maxAmount.toLocaleString()}</small>
            </div>

            <div className="investment-summary">
              <h3>Profit Projection</h3>
              <div className="summary-row">
                <span>Investment:</span>
                <span>${parseFloat(amount || '0').toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>ROI:</span>
                <span className="gold">{selectedPlan.roi}%</span>
              </div>
              <div className="summary-row">
                <span>Expected Return:</span>
                <span className="gold">${(parseFloat(amount || '0') * (1 + selectedPlan.roi / 100)).toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Net Profit:</span>
                <span className="gold">${(parseFloat(amount || '0') * selectedPlan.roi / 100).toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Daily Profit:</span>
                <span>${(parseFloat(amount || '0') * selectedPlan.roi / 100 / selectedPlan.lockupPeriod).toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Duration:</span>
                <span>{selectedPlan.lockupPeriod} Days</span>
              </div>
            </div>

            <button 
              className="btn btn-gold btn-lg btn-full"
              onClick={handleInvest}
              disabled={isInvesting || !amount || parseFloat(amount) < selectedPlan.minAmount}
            >
              {isInvesting ? '⏳ Processing...' : '🚀 Start Mining Now'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlans;