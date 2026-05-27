import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const countries = [
  'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'United States', 'United Kingdom',
  'Canada', 'Australia', 'India', 'Brazil', 'Mexico', 'Germany', 'France',
  'Spain', 'Italy', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
  'Finland', 'Belgium', 'Austria', 'Ireland', 'Portugal', 'Poland', 'Czech Republic',
  'Turkey', 'UAE', 'Saudi Arabia', 'Egypt', 'Morocco', 'Algeria', 'Tunisia',
  'Senegal', 'Ivory Coast', 'Cameroon', 'Zambia', 'Zimbabwe', 'Botswana',
  'Philippines', 'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Singapore',
  'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela'
];

const Withdrawal: React.FC = () => {
  const [method, setMethod] = useState<'bank' | 'cashapp' | 'paypal' | 'bitcoin' | ''>('');
  const [amount, setAmount] = useState('');
  const [country, setCountry] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [iban, setIban] = useState('');
  const [cashTag, setCashTag] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [btcAddress, setBtcAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [kycVerified, setKycVerified] = useState<boolean | null>(null);
  const [checkingKyc, setCheckingKyc] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkKycStatus();
  }, []);

  const checkKycStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/login'); return; }
      const res = await fetch(`${API_BASE_URL}/kyc/status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setKycVerified(data.status === 'verified');
      } else {
        setKycVerified(false);
      }
    } catch (e) {
      setKycVerified(false);
    } finally {
      setCheckingKyc(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!amount || parseFloat(amount) < 20) {
      setError('Minimum withdrawal amount is $20');
      return;
    }
    if (!method) {
      setError('Please select a withdrawal method');
      return;
    }
    if (!kycVerified) {
      setError('You must verify your identity (KYC) before making a withdrawal. Please go to the KYC page.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const methodLabel = method === 'bank' ? 'Bank Transfer' : method === 'cashapp' ? 'CashApp' : method === 'paypal' ? 'PayPal' : 'Bitcoin';
      let walletAddr = '';
      if (method === 'bank') {
        walletAddr = JSON.stringify({ country, bankName, accountName, accountNumber, routingNumber: routingNumber || undefined, swiftCode: swiftCode || undefined, iban: iban || undefined });
      } else if (method === 'cashapp') {
        walletAddr = cashTag;
      } else if (method === 'paypal') {
        walletAddr = paypalEmail;
      } else if (method === 'bitcoin') {
        walletAddr = btcAddress;
      }

      const response = await fetch(`${API_BASE_URL}/withdrawals/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          method: methodLabel,
          amount: parseFloat(amount),
          walletAddress: walletAddr
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Withdrawal request for $${parseFloat(amount).toLocaleString()} submitted successfully!`);
        setTimeout(() => { window.location.href = '/dashboard'; }, 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKycRedirect = () => {
    navigate('/kyc');
  };

  if (checkingKyc) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Checking verification status...</p>
      </div>
    );
  }

  if (kycVerified === false) {
    return (
      <div className="withdrawal-page">
        <div className="page-header">
          <h1>Withdrawal Restricted</h1>
          <p>Identity verification required to withdraw funds</p>
        </div>
        <div className="card" style={{maxWidth:'560px', margin:'40px auto', padding:'48px', textAlign:'center'}}>
          <div style={{fontSize:'4rem', marginBottom:'20px'}}>🔒</div>
          <h2 style={{fontWeight:700, marginBottom:'12px', fontSize:'1.4rem'}}>KYC Verification Required</h2>
          <p style={{color:'var(--text-secondary)', marginBottom:'24px', lineHeight:1.7}}>
            For your security and to comply with financial regulations, you need to complete identity verification (KYC) before you can withdraw funds from your account.
          </p>
          <div style={{display:'flex', flexDirection:'column', gap:'12px', maxWidth:'320px', margin:'0 auto 28px'}}>
            {['Verify your identity', 'Unlock withdrawal access', 'Higher withdrawal limits'].map((item, i) => (
              <div key={i} style={{display:'flex', alignItems:'center', gap:'10px', color:'var(--text-secondary)'}}>
                <i className="fas fa-check-circle" style={{color:'var(--accent-primary)'}}></i>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleKycRedirect}>
            <i className="fas fa-shield-halved"></i> Complete Verification
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="withdrawal-page">
      <div className="page-header">
        <h1>Request Withdrawal</h1>
        <p>Choose your preferred withdrawal method</p>
      </div>

      {error && <div className="error-message"><i className="fas fa-exclamation-circle"></i> {error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="card" style={{maxWidth:'680px', margin:'0 auto', padding:'40px 32px'}}>
        <h3 style={{fontWeight: 700, marginBottom: '24px'}}>
          <i className="fas fa-money-bill-transfer" style={{color:'var(--accent-primary)', marginRight:8}}></i>
          Select Withdrawal Method
        </h3>

        {/* Method Selection */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'12px', marginBottom:'28px'}}>
          <button onClick={() => setMethod('bank')} className={`deposit-method-card ${method === 'bank' ? 'selected' : ''}`} style={{textAlign:'center', padding:'20px 12px'}}>
            <div style={{fontSize:'2rem', marginBottom:'8px'}}>🏦</div>
            <div style={{fontWeight:600, fontSize:'0.85rem'}}>Bank Transfer</div>
          </button>
          <button onClick={() => setMethod('cashapp')} className={`deposit-method-card ${method === 'cashapp' ? 'selected' : ''}`} style={{textAlign:'center', padding:'20px 12px'}}>
            <div style={{fontSize:'2rem', marginBottom:'8px'}}>💵</div>
            <div style={{fontWeight:600, fontSize:'0.85rem'}}>CashApp</div>
          </button>
          <button onClick={() => setMethod('paypal')} className={`deposit-method-card ${method === 'paypal' ? 'selected' : ''}`} style={{textAlign:'center', padding:'20px 12px'}}>
            <div style={{fontSize:'2rem', marginBottom:'8px'}}>🅿️</div>
            <div style={{fontWeight:600, fontSize:'0.85rem'}}>PayPal</div>
          </button>
          <button onClick={() => setMethod('bitcoin')} className={`deposit-method-card ${method === 'bitcoin' ? 'selected' : ''}`} style={{textAlign:'center', padding:'20px 12px'}}>
            <div style={{fontSize:'2rem', marginBottom:'8px'}}>₿</div>
            <div style={{fontWeight:600, fontSize:'0.85rem'}}>Bitcoin</div>
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Amount (USD)</label>
          <input type="number" className="form-input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount (min: $20)" min={20} />
        </div>

        {/* Bank Transfer Fields */}
        {method === 'bank' && (
          <>
            <div className="form-group">
              <label className="form-label">Select Country</label>
              <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Select your country...</option>
                {countries.map(c => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Bank Name</label><input type="text" className="form-input" value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="e.g. First Bank, Chase" /></div>
            <div className="form-group"><label className="form-label">Account Holder Name</label><input type="text" className="form-input" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Full name on account" /></div>
            <div className="form-group"><label className="form-label">Account Number</label><input type="text" className="form-input" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Account number" /></div>
            <div className="form-group"><label className="form-label">Routing / Sort Code <span style={{color:'var(--text-tertiary)'}}>(optional)</span></label><input type="text" className="form-input" value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} placeholder="Routing number" /></div>
            <div className="form-group"><label className="form-label">SWIFT / BIC <span style={{color:'var(--text-tertiary)'}}>(optional)</span></label><input type="text" className="form-input" value={swiftCode} onChange={(e) => setSwiftCode(e.target.value)} placeholder="e.g. BOFAUS3N" /></div>
            <div className="form-group"><label className="form-label">IBAN <span style={{color:'var(--text-tertiary)'}}>(optional)</span></label><input type="text" className="form-input" value={iban} onChange={(e) => setIban(e.target.value)} placeholder="International Bank Account Number" /></div>
          </>
        )}

        {/* CashApp */}
        {method === 'cashapp' && (
          <div className="form-group">
            <label className="form-label">CashApp $Cashtag</label>
            <input type="text" className="form-input" value={cashTag} onChange={(e) => setCashTag(e.target.value)} placeholder="$yourcashtag" />
          </div>
        )}

        {/* PayPal */}
        {method === 'paypal' && (
          <div className="form-group">
            <label className="form-label">PayPal Email</label>
            <input type="email" className="form-input" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} placeholder="your@email.com" />
          </div>
        )}

        {/* Bitcoin */}
        {method === 'bitcoin' && (
          <div className="form-group">
            <label className="form-label">Bitcoin Wallet Address</label>
            <input type="text" className="form-input" value={btcAddress} onChange={(e) => setBtcAddress(e.target.value)} placeholder="Enter your BTC wallet address (e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)" />
          </div>
        )}

        <div className="withdrawal-summary" style={{margin:'24px 0'}}>
          <h4>Withdrawal Summary</h4>
          <div className="summary-item"><span>Method:</span><span>{method === 'bank' ? 'Bank Transfer' : method === 'cashapp' ? 'CashApp' : method === 'paypal' ? 'PayPal' : method === 'bitcoin' ? 'Bitcoin' : '-'}</span></div>
          <div className="summary-item"><span>Amount:</span><span>${parseFloat(amount || '0').toLocaleString()}</span></div>
          <div className="summary-item"><span>Processing Fee:</span><span>0%</span></div>
          <div className="summary-item"><span>Processing Time:</span><span>24-72 hours</span></div>
        </div>

        <button className="btn btn-primary btn-lg btn-full" onClick={handleWithdrawal}
          disabled={isLoading || !amount || !method}>
          {isLoading ? '⏳ Processing...' : '📤 Submit Withdrawal Request'}
        </button>

        <div className="security-notice" style={{marginTop:'16px'}}>🔒 Your details are encrypted and securely stored.</div>
      </div>
    </div>
  );
};

export default Withdrawal;