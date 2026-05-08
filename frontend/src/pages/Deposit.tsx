import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Deposit: React.FC = () => {
  const [methods, setMethods] = useState<any[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'select' | 'details' | 'confirm'>('select');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');
  const [giftCardBrand, setGiftCardBrand] = useState('');
  const [copyText, setCopyText] = useState('');
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
      const response = await fetch('http://localhost:5000/deposits/methods');
      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const data = await response.json();
      setMethods(data);
    } catch (error) {
      setError('Error fetching deposit methods. Please try again.');
    }
  };

  const handleMethodSelect = (method: any) => {
    setSelectedMethod(method);
    setAmount(method.minAmount.toString());
    setStep('details');
    setError('');
    setSuccess('');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyText(text);
    setTimeout(() => setCopyText(''), 2000);
  };

  const handleSubmitDeposit = async () => {
    if (!amount || parseFloat(amount) < selectedMethod.minAmount) {
      setError(`Minimum amount is $${selectedMethod.minAmount}`);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload: any = {
        method: selectedMethod.type,
        amount: parseFloat(amount),
        reference: `DEP-${Date.now()}`
      };

      if (selectedMethod.id === 'gift-card') {
        payload.giftCardCode = giftCardCode;
        payload.giftCardBrand = giftCardBrand;
      }

      // For crypto wallets, include the wallet address
      if (selectedMethod.walletAddress) {
        payload.walletAddress = selectedMethod.walletAddress;
      }

      const response = await fetch('http://localhost:5000/deposits/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        setStep('confirm');
        setSuccess(`Deposit request submitted! Awaiting confirmation.`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getMethodIcon = (method: any) => {
    const icons: any = {
      'Credit/Debit Card': '💳',
      'Bitcoin (BTC)': '₿',
      'Ethereum (ETH)': '♦️',
      'USDT (TRC20)': '💵',
      'Gift Card': '🎁'
    };
    return icons[method.type] || '💰';
  };

  const renderMethodIcon = (method: any) => {
    if (method.type === 'Bitcoin (BTC)') {
      return <span style={{color: '#f7931a', fontSize: '1.8rem'}}>₿</span>;
    }
    if (method.type === 'Ethereum (ETH)') {
      return <span style={{color: '#627eea', fontSize: '1.8rem'}}>♦️</span>;
    }
    if (method.type === 'USDT (TRC20)') {
      return <span style={{color: '#26a17b', fontSize: '1.8rem'}}>💵</span>;
    }
    return <span style={{fontSize: '1.8rem'}}>{getMethodIcon(method)}</span>;
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Make a Deposit</h1>
      <p className="page-subtitle">Fund your account and start earning crypto profits today</p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {step === 'confirm' ? (
        <div className="deposit-success">
          <div className="success-icon">✅</div>
          <h2>Deposit Request Submitted!</h2>
          <p>Your deposit of <strong>${parseFloat(amount).toLocaleString()}</strong> via <strong>{selectedMethod?.type}</strong> is being processed.</p>
          <div className="deposit-details-card">
            <div className="detail-row">
              <span>Amount:</span>
              <span className="amount-highlight">${parseFloat(amount).toLocaleString()}</span>
            </div>
            <div className="detail-row">
              <span>Method:</span>
              <span>{selectedMethod?.type}</span>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className="status-pending">⏳ Pending Confirmation</span>
            </div>
            <div className="detail-row">
              <span>Reference:</span>
              <span>DEP-{Date.now()}</span>
            </div>
          </div>
          <p className="note-text">Your balance will be updated once the deposit is confirmed. This usually takes a few minutes.</p>
          <div className="action-buttons" style={{justifyContent: 'center', marginTop: 24}}>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
            <button className="btn btn-outline" onClick={() => { setStep('select'); setSelectedMethod(null); setSuccess(''); }}>Make Another Deposit</button>
          </div>
        </div>
      ) : (
        <>
          {/* Payment Methods Grid */}
          <div className="deposit-methods-grid">
            {methods.map((method) => (
              <div 
                key={method.id}
                className={`deposit-method-card ${selectedMethod?.id === method.id ? 'selected' : ''}`}
                onClick={() => handleMethodSelect(method)}
              >
                <div className="method-badge">{method.processingTime}</div>
                <div className="method-icon-large">{renderMethodIcon(method)}</div>
                <h3 className="method-name">{method.type}</h3>
                <p className="method-desc">{method.description.substring(0, 60)}...</p>
                <div className="method-bounds">
                  <span>Min: ${method.minAmount}</span>
                  <span>Max: ${method.maxAmount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Deposit Form */}
          {selectedMethod && step === 'details' && (
            <div className="deposit-form-container">
              <div className="deposit-form-card">
                <h2>Deposit via {selectedMethod.type}</h2>
                
                <div className="form-group">
                  <label>Amount (USD)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Min: $${selectedMethod.minAmount}`}
                    min={selectedMethod.minAmount}
                    max={selectedMethod.maxAmount}
                  />
                  <small>Min: ${selectedMethod.minAmount} | Max: ${selectedMethod.maxAmount.toLocaleString()}</small>
                </div>

                {/* Credit Card Form */}
                {selectedMethod.id === 'credit-card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="4242 4242 4242 4242" maxLength={19} />
                    </div>
                    <div className="card-row">
                      <div className="form-group">
                        <label>Expiry</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="John Doe" />
                    </div>
                    <div className="card-badges">
                      <span>💳 Visa</span>
                      <span>💳 Mastercard</span>
                      <span>💳 Amex</span>
                    </div>
                  </div>
                )}

                {/* Crypto Wallet Info */}
                {selectedMethod.walletAddress && (
                  <div className="crypto-wallet-section">
                    <h3>Send to this wallet address:</h3>
                    <div className="wallet-address-box">
                      <code>{selectedMethod.walletAddress}</code>
                      <button 
                        className="btn-copy"
                        onClick={() => handleCopy(selectedMethod.walletAddress)}
                      >
                        {copyText === selectedMethod.walletAddress ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                    <div className="wallet-details">
                      <div className="detail-row">
                        <span>Network:</span>
                        <span>{selectedMethod.id === 'bitcoin' ? 'Bitcoin (BTC)' : selectedMethod.id === 'ethereum' ? 'ERC20' : 'TRC20'}</span>
                      </div>
                      <div className="detail-row">
                        <span>Processing Time:</span>
                        <span>{selectedMethod.processingTime}</span>
                      </div>
                      <div className="detail-row">
                        <span>Fee:</span>
                        <span>{selectedMethod.fee}</span>
                      </div>
                    </div>
                    <div className="qr-placeholder">
                      <span>📱</span>
                      <p>Scan QR Code</p>
                    </div>
                  </div>
                )}

                {/* Gift Card Form */}
                {selectedMethod.id === 'gift-card' && (
                  <div className="giftcard-section">
                    <h3>Gift Card Details</h3>
                    <div className="form-group">
                      <label>Gift Card Brand</label>
                      <select value={giftCardBrand} onChange={(e) => setGiftCardBrand(e.target.value)}>
                        <option value="">Select brand...</option>
                        {selectedMethod.brands?.map((brand: string) => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Gift Card Code</label>
                      <input 
                        type="text" 
                        value={giftCardCode}
                        onChange={(e) => setGiftCardCode(e.target.value)}
                        placeholder="Enter gift card code" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Gift Card PIN (if applicable)</label>
                      <input type="text" placeholder="Enter gift card PIN" />
                    </div>
                    <div className="brand-badges">
                      {selectedMethod.brands?.map((brand: string) => (
                        <span key={brand} className="brand-badge">{brand}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Summary */}
                <div className="deposit-summary">
                  <h3>Deposit Summary</h3>
                  <div className="summary-row">
                    <span>Method:</span>
                    <span className="summary-value">{selectedMethod.type}</span>
                  </div>
                  <div className="summary-row">
                    <span>Amount:</span>
                    <span className="summary-value gold">${parseFloat(amount || '0').toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Processing Fee:</span>
                    <span className="summary-value">{selectedMethod.fee}</span>
                  </div>
                  <div className="summary-row">
                    <span>Processing Time:</span>
                    <span className="summary-value">{selectedMethod.processingTime}</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary btn-lg btn-full"
                  onClick={handleSubmitDeposit}
                  disabled={isLoading || !amount || parseFloat(amount) < selectedMethod.minAmount}
                >
                  {isLoading ? '⏳ Processing...' : '✅ Confirm Deposit'}
                </button>

                <div className="security-note">
                  🔒 256-bit SSL Encrypted • PCI Compliant
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Deposit;