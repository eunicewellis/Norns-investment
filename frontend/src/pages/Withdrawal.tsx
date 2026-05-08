import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Withdrawal: React.FC = () => {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchMethods();
  }, [navigate]);

  const fetchMethods = async () => {
    try {
      const response = await fetch('http://localhost:5000/withdrawals/methods', {
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
      setMethods(data);
    } catch (error) {
      setError('Error fetching withdrawal methods. Please try again.');
      console.error('Error fetching withdrawal methods:', error);
    }
  };

  const handleMethodSelect = (method: any) => {
    setSelectedMethod(method);
    setAmount(method.minAmount.toString());
    setError('');
    setSuccess('');
  };

  const handleWithdrawal = async () => {
    if (!amount || parseFloat(amount) < selectedMethod.minAmount) {
      setError(`Minimum amount for ${selectedMethod.type} is $${selectedMethod.minAmount}`);
      return;
    }

    if (parseFloat(amount) > selectedMethod.maxAmount) {
      setError(`Maximum amount for ${selectedMethod.type} is $${selectedMethod.maxAmount}`);
      return;
    }

    if (selectedMethod.type === 'Cryptocurrency' && !walletAddress) {
      setError('Please enter your crypto wallet address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/withdrawals/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          method: selectedMethod.type,
          amount: parseFloat(amount),
          walletAddress: selectedMethod.type === 'Cryptocurrency' ? walletAddress : null
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Withdrawal request for $${parseFloat(amount).toLocaleString()} ${selectedMethod.type} submitted successfully!`);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="withdrawal-page">
      <div className="page-header">
        <h1>Request Withdrawal</h1>
        <p>Choose your preferred withdrawal method and receive your funds</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="withdrawal-grid">
        <div className="withdrawal-methods">
          <h3>Select Withdrawal Method</h3>
          <div className="methods-list">
            {methods.map((method: any) => (
              <div 
                className={`method-card ${selectedMethod?.type === method.type ? 'selected' : ''}`}
                key={method.type}
                onClick={() => handleMethodSelect(method)}
              >
                <div className="method-icon">
                  {method.type === 'Bank Transfer' && '🏦'}
                  {method.type === 'Cryptocurrency' && '₿'}
                  {method.type === 'E-Wallet' && '📱'}
                </div>
                <div className="method-details">
                  <h4>{method.type}</h4>
                  <p>{method.description}</p>
                  <p className="processing-time">Processing Time: {method.processingTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedMethod && (
          <div className="withdrawal-form">
            <h3>Withdraw via {selectedMethod.type}</h3>
            <p>{selectedMethod.instructions}</p>
            
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Enter amount ($${selectedMethod.minAmount} - $${selectedMethod.maxAmount})`}
                className="form-control"
              />
              <div className="amount-limits">
                <span>Minimum: ${selectedMethod.minAmount}</span>
                <span>Maximum: ${selectedMethod.maxAmount}</span>
              </div>
            </div>

            {selectedMethod.type === 'Cryptocurrency' && (
              <div className="form-group">
                <label htmlFor="walletAddress">Wallet Address</label>
                <input
                  type="text"
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter your crypto wallet address"
                  className="form-control"
                />
              </div>
            )}

            <div className="withdrawal-summary">
              <h4>Withdrawal Summary</h4>
              <div className="summary-item">
                <span>Withdrawal Method:</span>
                <span>{selectedMethod.type}</span>
              </div>
              <div className="summary-item">
                <span>Amount:</span>
                <span>${parseFloat(amount).toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>Processing Time:</span>
                <span>{selectedMethod.processingTime}</span>
              </div>
              <div className="summary-item">
                <span>Processing Fee:</span>
                <span>0.5%</span>
              </div>
              <div className="summary-item">
                <span>You Will Receive:</span>
                <span>${(parseFloat(amount) * 0.995).toLocaleString()}</span>
              </div>
            </div>

            <button 
              className="btn btn-success btn-full btn-lg"
              onClick={handleWithdrawal}
              disabled={
                isLoading || 
                !amount || 
                parseFloat(amount) < selectedMethod.minAmount ||
                parseFloat(amount) > selectedMethod.maxAmount ||
                (selectedMethod.type === 'Cryptocurrency' && !walletAddress)
              }
            >
              {isLoading ? 'Processing...' : 'Submit Withdrawal Request'}
            </button>

            <div className="security-notice">
              <p>🔒 All withdrawals are processed securely and verified for your protection</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Withdrawal;